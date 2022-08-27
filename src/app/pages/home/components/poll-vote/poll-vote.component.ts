import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ApexCharts from 'apexcharts';
import { Poll } from 'src/app/interfaces/Poll';
import { PollVote } from 'src/app/interfaces/PollVote';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements OnInit {

  @ViewChild('chart') chart?: ElementRef;
  @Input() set loadPoll(poll: Poll) {
    this.deleteChart();
    this.poll = poll;
    this.changeRef.detectChanges();
    if(this.poll?.voted) this.createChart();

  }

  @Output() pollVoted: EventEmitter<PollVote> = new EventEmitter();

  public poll?: Poll;
  public voteGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private changeRef: ChangeDetectorRef
  ) {
    this.voteGroup = this.fb.group({
      selected: this.fb.control("", [Validators.required])
    })
  }

  ngOnInit(): void {

  }


  submitForm() {

    const pollVoted: PollVote = {
        id: this.poll!.id,
        vote: this.voteGroup.get("selected")?.value
    }

    this.pollVoted.emit(pollVoted);
  }

  createChart() {
    if(!this.poll?.results) return;

    const options: ApexCharts.ApexOptions = {
      series: [
        {
          data: this.poll.results
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true
        }
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: this.poll?.options
      }
    }

    if (this.chart) {
      const chart = new ApexCharts(this.chart.nativeElement, options);
      chart.render();
    }

  }

  deleteChart() {
    if (this.chart) {
      while (this.chart.nativeElement.firstChild) {
        this.chart.nativeElement.removeChild(this.chart.nativeElement.firstChild);
      }
    }
  }


}
