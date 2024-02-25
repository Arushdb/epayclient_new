import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionContainer } from '../shared/subscription-container';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Location } from '@angular/common';
import { OtherDetail } from '../other-detail';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';
import { MatDateRangeInput, MatDateRangePicker, MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-viewfeestatus',
  templateUrl: './viewfeestatus.component.html',
  styleUrls: ['./viewfeestatus.component.css']
})
export class ViewfeestatusComponent implements AfterViewInit {


  myurl = this.studentservice.url;
  feeForm!: FormGroup;
  selectedOption: any;
  submitted = false;

  show!: boolean;
  feetype: any;
  subs = new SubscriptionContainer();
  busystatus: boolean = false;
  title!: string;
  category: string = "";
  rectype: string = "";
  daterange!: any;
  dob: any;
  //otherdetail: string="";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private studentservice: StudentService,
    private location: Location,

    private _Activatedroute: ActivatedRoute,
    private elementRef: ElementRef
  ) { }

  // convenience getter for easy access to form fields
  get f() {

    return this.feeForm.controls;
  }

  getdaterange(daterange: any) {
    console.log(daterange);
    this.daterange = daterange;
    //this.f['startdate'].setValue=this.daterange.startdate;
    //this.f['enddate'].setValue=this.daterange.enddate;
    this.feeForm.get("startdate")?.setValue(this.daterange.startdate);
    this.feeForm.get("enddate")?.setValue(this.daterange.enddate);
  }
  getdate(date: any) {
    console.log(date);
    //this.dob=date;
    // this.f['dob'].setValue=date;
    this.feeForm.get("dob")?.setValue(date);
  }

  ngAfterViewInit() {
    console.log('Values on ngAfterViewInit():');
    console.log('radio' + this.selectedOption);


    //console.log("primary date range:", this.daterange.'matStartDate);

  }

  ngOnDestroy(): void {

    this.subs.dispose();
    this.elementRef.nativeElement.remove();

  }

  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {

    this.show = false;
    this.submitted = false;
    this.subs.add = this._Activatedroute.data.subscribe(data => {



    });


    this.feeForm = this.formBuilder.group({

      ATRN: [''],
     // feeamount: ['0', Validators.min(100)],
      merchantorderno: [''],
      rollno: [''],
      startdate: [''],
      enddate: [''],
      dob: ['']



    });




  }

  submit(form: any) {

    // if(this.selectedOption == 1)
    // this.feeForm.get("feeamount")?.setValue(150);// to by pass validator
    
    console.log("select option on radio", this.selectedOption);

    console.log("Start date value:", this.f['startdate'].value);
    console.log("End date value:", this.f['enddate'].value);
    console.log("Date of Birth:", this.f['dob'].value);
debugger;

    //this.show=true;
    this.submitted = true;
    if (form.invalid)
      return;

    if (this.f['merchantorderno'].value == "" && this.f['ATRN'].value == "" &&
      this.selectedOption == 2) {
      this.studentservice.log("Please fill up details");
      this.submitted = false;
      return;
    }



    debugger;

    this.myurl = this.studentservice.url + '/viewfeestatus';
    let elem: any = document.getElementById("linkid");

    if (this.selectedOption == 2) {
      this.myurl = this.myurl + "?" + "merchantorderno=" 
      + this.f['merchantorderno'].value + "&"  
      
      + "&" + "ATRN=" + this.f['ATRN'].value + "&" + "selectedOption=" + this.selectedOption;
    
        // elem.setAttribute("merchantorderno", this.f['merchantorderno'].value);
        // elem.setAttribute("feeamount", this.f['feeamount'].value);
        // elem.setAttribute("ATRN", this.f['ATRN'].value);
        // elem.setAttribute("selectedOption", this.selectedOption);
        elem.setAttribute("href", this.myurl);
      }
    if (this.selectedOption == 1) {

      this.myurl = this.myurl + "?" + "rollno=" + this.f['rollno'].value
        + "&" + "dob=" + this.f['dob'].value
        + "&" + "startdate=" + this.f['startdate'].value
        + "&" + "enddate=" + this.f['enddate'].value
        + "&" + "selectedOption=" + this.selectedOption;
        // elem.setAttribute("rollno", this.f['rollno'].value);
        // elem.setAttribute("dob", this.f['dob'].value);
        // elem.setAttribute("startdate", this.f['startdate'].value);
        
        //  elem.setAttribute("enddate", this.f['enddate'].value);
        //  elem.setAttribute("selectedOption", this.selectedOption);
        elem.setAttribute("href", this.myurl);

    }

debugger;
   // console.log("fee amount" + this.f['feeamount'].value);
    
    document.getElementById("linkid")?.click();

    // this.feeForm.reset();






  }



}
