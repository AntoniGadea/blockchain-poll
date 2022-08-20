import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public showModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  createPoll() {
    this.showModal = true;
  }

  close() {
    console.log('here');

    this.showModal = false;
  }

}
