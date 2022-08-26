import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Poll } from '../interfaces/Poll';
import { PollForm } from '../interfaces/PollForm';
import { PollVote } from '../interfaces/PollVote';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() { }

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
    console.log(vote);

  }

  createPoll(pollForm: PollForm) {
    console.log(pollForm);
  }
}
