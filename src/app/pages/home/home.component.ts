import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/interfaces/Poll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public dataSet: Poll[] = [
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
  ];

  public selectedPoll?: Poll;

  constructor() { }

  ngOnInit(): void {
  }

  setSelected(poll: Poll) {
    this.selectedPoll = poll;
  }

}
