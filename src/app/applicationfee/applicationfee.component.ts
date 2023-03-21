import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { SubscriptionContainer } from '../shared/subscription-container';
import { Location, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-applicationfee',
  templateUrl: './applicationfee.component.html',
  styleUrls: ['./applicationfee.component.css']
})
export class ApplicationfeeComponent implements OnInit {

  feeForm!: FormGroup;
  
  submitted = false;

  show!: boolean;
  feetype: any;
  subs = new SubscriptionContainer();
  busystatus: boolean = false;
  title!: string;

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
    
      this.feetype = data['feetype'];
    });




    

    this.feeForm = this.formBuilder.group({

      applicationno: [''],


      studentname: [''],
      feeamount: [''],

    });

    if (this.feetype == 'appfee') {
      this.title = "Application Fee";
      this.f['applicationno'].setValidators([Validators.required, Validators.minLength(6)])
    }


    if (this.feetype == 'newadm') {
      this.title = "Admission Fee";
      this.f['applicationno'].setValidators([Validators.required, Validators.minLength(10)])

    }


  }

  submit(form: any) {
    debugger;
    
    this.f['applicationno'].setValue(String(this.f['applicationno'].value).toUpperCase());
    //this.show=true;
    this.submitted = true;
    if (form.invalid)
      return;
    let myfeeform: any;
    myfeeform = this.feeForm.getRawValue();
    this.busystatus=true;
    if (this.feetype == 'appfee') {

      debugger;

     // this.subs.add = this.studentservice.getApplicantDetail(myfeeform).subscribe((res:Object) => {
     this.subs.add=this.studentservice.getAdmissionDetail(myfeeform).subscribe (
     { next:(res:any)=>{this.show = true;

      this.f['feeamount'].setValue(res[0].appfee);
      this.f['studentname'].setValue(res[0]['studentname']);
      this.busystatus=false;
      return;}
      ,error: (err) =>{this.busystatus=false;
        this.studentservice.log(err.error.message);
        this.feeForm.reset();
        return;}});
     
     
    //  this.subs.add = this.studentservice.getApplicantDetail(myfeeform).subscribe((res:any) => {
    //     this.show = true;

    //     this.f['feeamount'].setValue(res[0].appfee);
    //     this.f['studentname'].setValue(res[0]['studentname']);
    //     this.busystatus=false;
    //     return;

    //   }, (err:any) => {
    //     debugger;
    //     console.log(err);
    //     this.busystatus=false;
    //     this.studentservice.log(err.error.message);
    //     this.feeForm.reset();
    //     return;
    //   });
    }


    if (this.feetype == 'newadm') {

      this.subs.add=this.studentservice.getAdmissionDetail(myfeeform).subscribe (
        { next:(res:any)=>{this.show = true;
   
         this.f['feeamount'].setValue(res[0].appfee);
         this.f['studentname'].setValue(res[0]['studentname']);
         this.busystatus=false;
         return;}
         ,error: (err) =>{this.busystatus=false;
           this.studentservice.log(err.error.message);
           this.feeForm.reset();
           return;}});




      // this.subs.add = this.studentservice.getAdmissionDetail(myfeeform).subscribe(res => {
      //   this.show = true;
      //   this.busystatus=false;
      //   this.f['feeamount'].setValue(res[0].amount);
      //   this.f['studentname'].setValue(res[0]['studentname']);
      //   return;

      // }, err => {
      //   console.log(err);
      //   debugger;
      //   this.busystatus=false;
      //   this.studentservice.log(err.error.message);
      //   this.feeForm.reset();
      //   return;
     
      // });
    }


  }

}
