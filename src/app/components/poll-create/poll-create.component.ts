import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {

  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public pollForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.pollForm = this.fb.group({
      question: this.fb.control('', [Validators.required]),
      image: this.fb.control(''),
      option1: this.fb.control(''),
      option2: this.fb.control(''),
      option3: this.fb.control('')
    })
  }

  ngOnInit(): void {

  }

  submitForm() {
    console.log(this.pollForm.value);
  }

  closeModal() {
    this.closeEvent.emit(true);
  }

}
