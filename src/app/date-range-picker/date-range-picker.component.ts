import { Component, Input } from '@angular/core';

import { Output, EventEmitter } from '@angular/core';
import { MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';


@Component({
  selector: 'daterangepicker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent {
  [x: string]: any;
  daterange :any;
  dateofbirth:any;

 
  @Output() rangePickerEvent = new EventEmitter<any>();

  constructor(){

  }

 
   
 dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
  this.daterange={
    "startdate":dateRangeStart.value,"enddate":dateRangeEnd.value};
  this.rangePickerEvent.emit(this.daterange);
  console.log(dateRangeStart.value);
  console.log(dateRangeEnd.value);
}

}
