import { Component, OnInit } from '@angular/core';
import { PollForm } from 'src/app/interfaces/PollForm';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public showModal: boolean = false;

  constructor(
    private pollService: PollService
  ) { }

  ngOnInit(): void {
  }

  createPoll() {
    this.showModal = true;
    document.body.classList.toggle('modal-open');
  }

  handlePollCreate(event: PollForm) {
    this.pollService.createPoll(event);
  }

  close() {
    this.showModal = false;
  }

}
