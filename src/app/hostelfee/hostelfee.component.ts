import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { SubscriptionContainer } from '../shared/subscription-container';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hostelfee',
  templateUrl: './hostelfee.component.html',
  styleUrls: ['./hostelfee.component.css']
})
export class HostelfeeComponent implements OnInit {

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
  this.title = "Hostel Fee (Select roll number if  allocated)"
    this.show = false;
    this.showhostel =false;
    this.showappno=false;
    this.showrollno=false;
    this.submitted = false;
    this.subs.add = this._Activatedroute.data.subscribe(data => {
    
      this.feetype = data['feetype']
    });

  

    this.feeForm = this.formBuilder.group({

      applicationno: [''],
      rollno: [''],
      yearmonth:['', Validators.required],
      hostelid:['', Validators.required],

      mode: ['', Validators.required],
      studentname: [''],
      feeamount: ['']

    });

   

  }

  onmodechanged(evt: { target: any; }){
    
    this.showhostel =true;
    var target = evt.target;
    if (target.defaultValue=='byapplno'){
      this.f['applicationno'].setValidators([Validators.required, Validators.minLength(10)]);
      this.showappno =true;
      this.showrollno = false;
    
    }
    if (target.defaultValue=='byrollno'){
      this.f['rollno'].setValidators([Validators.required, Validators.minLength(6)]);
      this.showrollno = true;
      this.showappno =false;
    }
   

    }

  submit(form: any) {
    
    
    
    this.f['applicationno'].setValue(String(this.f['applicationno'].value).toUpperCase());
    //this.show=true;
    this.submitted = true;
    if (form.invalid){
   
      return;
    }
     
    let myfeeform: any;
    myfeeform = this.feeForm.getRawValue();
    this.busystatus=true;

    ////

    this.subs.add=this.studentservice.gethostelfee(myfeeform).subscribe (
      { next:(res:any)=>{this.show = true;
    
       this.f['feeamount'].setValue(res[0].amount);
       this.f['studentname'].setValue(res[0]['studentname']);
      
       this.busystatus=false;
       return;}
       ,error: (err) =>{this.busystatus=false;
       
        
         this.busystatus=false;
            this.studentservice.log(err.error.message);
            this.feeForm.reset();
    
         return;}});
    
    
    
    
    ///

   
      // this.subs.add = this.studentservice.gethostelfee(myfeeform).subscribe(res => {
      //   this.show = true;

      //   this.f['feeamount'].setValue(res[0].amount);
      //   this.f['studentname'].setValue(res[0]['studentname']);
      //   this.busystatus=false;

      // }, err => {
      //   console.log(err);
      //   this.busystatus=false;
      //   this.studentservice.log(err.error.message);
      //   this.feeForm.reset();
      // });
    


  


  }

}
