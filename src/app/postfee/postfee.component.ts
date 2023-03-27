
import { Component, ElementRef, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { SubscriptionContainer } from '../shared/subscription-container';
import { Location } from '@angular/common';


@Component({
  selector: 'app-postfee',
  templateUrl: './postfee.component.html',
  styleUrls: ['./postfee.component.css']
})
export class PostfeeComponent implements OnInit {


  feeForm!: FormGroup;
  
  submitted = false;

  show!: boolean;
  feetype: any;
  subs = new SubscriptionContainer();
  busystatus: boolean = false;
  title!: string;
  fieldlabel!: string;
  
  showappno!: boolean;
  showrollno!: boolean;
  showhostel!: boolean;

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
  this.title = "Post Fee "
    this.show = false;
    
   
 
    this.submitted = false;
     

    this.feeForm = this.formBuilder.group({

      applicationno: ['',[Validators.required,Validators.minLength(8)]],
      studentname: [''],
      feeamount: ['']

    });

   

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

    ////

this.subs.add=this.studentservice.getpostfee(myfeeform).subscribe (
  { next:(res:any)=>{this.show = true;

   this.f['feeamount'].setValue(res[0].amount);
   this.f['studentname'].setValue(res[0]['studentname']);
  
   this.busystatus=false;
   this.studentservice.clear();
   return;}
   ,error: (err) =>{this.busystatus=false;
   
    
     this.busystatus=false;
        this.studentservice.log(err.error.message);
        this.feeForm.reset();

     return;}});



  }

}
