import {Component} from 'angular2/core';
import {TimeAgoPipe, CalendarPipe, DateFormatPipe} from 'angular2-moment';

@Component({
  selector: 'time-ago',
  pipes: [TimeAgoPipe, CalendarPipe, DateFormatPipe],
  template: `
    <b>{{myDate | amTimeAgo}}</b>
  `
})
export class TimeAgo {
  myDate: Date;

  constructor() {
    this.myDate = new Date();
  }
}