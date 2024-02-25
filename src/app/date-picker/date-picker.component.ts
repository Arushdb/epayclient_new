import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'datepicker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  date: any;
  @Output() datePickerEvent = new EventEmitter<any>();


  OnDateChange(date:HTMLInputElement){
    this.date=date.value;
    this.datePickerEvent.emit(this.date);
   }
}
