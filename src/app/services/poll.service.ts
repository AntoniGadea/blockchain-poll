import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Poll } from '../interfaces/Poll';
import { PollForm } from '../interfaces/PollForm';
import { PollVote } from '../interfaces/PollVote';
import { Web3Service } from './web3.service';
import { fromAscii, toAscii } from 'web3-utils';
@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(
    private web3: Web3Service
  ) { }

  async getPolls(): Promise<Poll[]> {
    const polls: Poll[] = [];

    const totalPolls = await this.web3.call('getTotalPolls');
    const acc = await this.web3.getAccount();
    const voter = await this.web3.call('getVoter', acc);
    const voterNormalized = this.normalizeVoter(voter);

    for (let i = 0; i < totalPolls; i++) {
      const pollRaw = await this.web3.call('getPoll', i);
      const pollNormalized = this.normalizePoll(pollRaw, voterNormalized);
      polls.push(pollNormalized);
    }

    return polls;
  }

  vote(vote: PollVote) {
    console.log('here');
    this.web3.executeTransaction("vote", vote.id, vote.vote);
  }

  createPoll(poll: PollForm) {
    this.web3.executeTransaction(
      'createPoll',
      poll.question,
      poll.thumbnail || '',
      poll.options.map((opt) => fromAscii(opt))
    );
  }

  private normalizeVoter(voter: any) {
    return {
      id: voter[0],
      votedIds: voter[1].map((vote: any) => parseInt(vote)),
    };
  }

  private normalizePoll(pollRaw: any, voter: any): Poll {
    return {
      id: parseInt(pollRaw[0]),
      question: pollRaw[1],
      thumbnail: pollRaw[2],
      results: pollRaw[3].map((vote: any) => parseInt(vote)),
      options: pollRaw[4].map((opt: any) => toAscii(opt).replace(/\u0000/g, '')),
      voted:
        voter.votedIds.length &&
        voter.votedIds.find((votedId: any) => votedId === parseInt(pollRaw[0])) !=
          undefined,
    };
  }

  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
