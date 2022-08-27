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

  public polls: Promise<Poll[]>;

  public selectedPoll?: Poll;

  constructor(
    private pollService: PollService
  ) {
    this.polls = this.pollService.getPolls();
  }

  ngOnInit(): void {
    this.pollService.onEvent('PollCreated').subscribe(
        () => {
            this.polls = this.pollService.getPolls();
        }
    )
  }

  setSelected(poll: Poll) {
    this.selectedPoll = poll;
  }

  handlePollVote(event: PollVote) {
    console.log(('here'));

    this.pollService.vote(event);
  }

}
