import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from 'src/app/interfaces/Poll';
import { PollVote } from 'src/app/interfaces/PollVote';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public polls: Observable<Poll[]>;

  public selectedPoll?: Poll;

  constructor(
    private pollService: PollService
  ) {
    this.polls = this.pollService.getPolls();
  }

  ngOnInit(): void {

  }

  setSelected(poll: Poll) {
    this.selectedPoll = poll;
  }

  handlePollVote(event: PollVote) {
    this.pollService.vote(event);
  }

}
