import { Component, Input, OnInit } from '@angular/core';
import { Poll } from 'src/app/interfaces/Poll';

@Component({
  selector: 'app-poll-card',
  templateUrl: './poll-card.component.html',
  styleUrls: ['./poll-card.component.scss']
})
export class PollCardComponent implements OnInit {

  @Input() poll?: Poll;
  public numberOfVotes?: number;
  constructor() { }

  ngOnInit(): void {
    this.calcVotes();
  }

  calcVotes(){
    if (this.poll?.results.length) {
      this.numberOfVotes = this.poll.results.reduce(
        (acc, curr) => {
          return acc += curr;
        }
      )
    }
  }

}
