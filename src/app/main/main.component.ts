import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {

    Object.freeze(this.OnStudent());
  }

  OnStudent(){
    console.log("inside on student");
    
  
  }
  

  
}
