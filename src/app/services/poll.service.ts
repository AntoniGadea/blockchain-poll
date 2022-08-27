import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Poll } from '../interfaces/Poll';
import { PollForm } from '../interfaces/PollForm';
import { PollVote } from '../interfaces/PollVote';
import { Web3Service } from './web3.service';
import { fromAscii } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(
    private web3: Web3Service
  ) { }

  getPolls(): Observable<Poll[]> {
    return of([
      {
        id: 1,
        thumbnail: "https://images.pexels.com/photos/12905899/pexels-photo-12905899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        question: "Do you like dogs?",
        results: [1,5,4,6],
        options: ['Monday','Tuesday','Wednesday'],
        voted: true
      },
      {
        id: 2,
        thumbnail: "https://images.pexels.com/photos/12905899/pexels-photo-12905899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        question: "Do you like dogs?",
        results: [1,5,4,6],
        options: ['Monday','Tuesday','Wednesday'],
        voted: false
      },
      {
        id: 3,
        thumbnail: "https://images.pexels.com/photos/12905899/pexels-photo-12905899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        question: "Do you like dogs?",
        results: [1,5,4,6],
        options: ['Yes','No'],
        voted: true
      }
    ]);
  }

  vote(vote: PollVote) {
    this.web3.executeTransaction("vote", vote.id, vote.vote);
  }

  createPoll(pollForm: PollForm) {
    this.web3.executeTransaction(
        "createPoll",
        pollForm.question,
        pollForm.thumbnail,
        pollForm.options.map(
            opt => fromAscii(opt)
        )
    );
  }
}
