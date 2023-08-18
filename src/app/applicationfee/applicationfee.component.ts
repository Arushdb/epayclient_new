import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { SubscriptionContainer } from '../shared/subscription-container';
import { Location, UpperCasePipe } from '@angular/common';
import {OtherDetail} from '../other-detail'

@Component({
  selector: 'app-applicationfee',
  templateUrl: './applicationfee.component.html',
  styleUrls: ['./applicationfee.component.css']
})
export class ApplicationfeeComponent implements OnInit {

  myurl = this.studentservice.url;
  feeForm!: FormGroup;
  
  submitted = false;

  show!: boolean;
  feetype: any;
  subs = new SubscriptionContainer();
  busystatus: boolean = false;
  title!: string;
  category :string="";
  rectype: string="";
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
    
    
      this.category=data['cat'];
    });

    this.myurl = this.studentservice.url+'/makepayment';


    

    this.feeForm = this.formBuilder.group({

      applicationno: [''],


      studentname: [''],
      feeamount: [''],
      applicationnumber: [''],
      branchid: [''],
      programid: [''],
      semestercode: [''],
      feetype: [''],
      semesterenddate: [''],
      entityid: [''],
      semesterstartdate: [''],
      programname: [''],
      latefee: [''],
      feepending: [''],

    });

    if (this.category == 'appfee') {
      this.title = "Application Fee";
      this.f['applicationno'].setValidators([Validators.required, Validators.minLength(6)])
    }


    if (this.category == 'newadm') {
      this.title = "Admission Fee";
      this.f['applicationno'].setValidators([Validators.required, Validators.minLength(10)])

    }


  }

  submit(form: any) {
    
    
    this.f['applicationno'].setValue(String(this.f['applicationno'].value).toUpperCase());
    //this.show=true;
    this.submitted = true;
    if (form.invalid)
      return;
    let myfeeform: any;
    myfeeform = this.feeForm.getRawValue();
    this.busystatus=true;
    if (this.category== 'appfee') {

     

     // this.subs.add = this.studentservice.getApplicantDetail(myfeeform).subscribe((res:Object) => {
     this.subs.add=this.studentservice.getApplicantDetail(myfeeform).subscribe (
     { next:(res:any)=>{this.show = true;

      this.f['feeamount'].setValue(res[0].appfee);
      this.f['studentname'].setValue(res[0]['studentname']);
      this.busystatus=false;
      this.studentservice.clear();

      this.f['feeamount'].setValue(res[0].appfee);
      this.f['studentname'].setValue(res[0]['studentname']);
      this.f['applicationnumber'].setValue(res[0]['applicationnumber']);
      this.f['branchid'].setValue(res[0]['branchid']);
      this.f['programid'].setValue(res[0]['programid']);
      this.f['semestercode'].setValue(res[0]['semestercode']);
      this.f['feetype'].setValue(res[0]['feetype']);
      this.f['semesterstartdate'].setValue(res[0]['semesterstartdate']);
      this.f['semesterenddate'].setValue(res[0]['semesterenddate']);
      this.f['entityid'].setValue(res[0]['entityid']);
      this.f['feepending'].setValue(res[0]['feepending']);
      this.f['programname'].setValue(res[0]['programname']);


      debugger;

     
      this.rectype="A";
      const otherdet = new OtherDetail() ;
      otherdet.category=this.category;
      otherdet.rollnumber=this.f['applicationnumber'].value;
      otherdet.studentname=this.f['studentname'].value;
      otherdet.programname=this.f['programname'].value;
      otherdet.rectype=this.rectype;
      otherdet.semesterstartdate=this.f['semesterstartdate'].value;
      otherdet.semesterenddate=this.f['semesterenddate'].value;
      otherdet.latefee=this.f['latefee'].value;
      otherdet.entityid=this.f['entityid'].value;
      otherdet.programid=this.f['programid'].value;
      otherdet.semester=this.f['semestercode'].value;
      otherdet.feepending=this.f['feepending'].value;
      otherdet.feetype=this.f['feetype'].value;
      
debugger;

      this.myurl=this.myurl+"?"+"totalfee="+this.f['feeamount'].value+"&"+"Otherdetail="+otherdet.otherdetailforcontinue() ;
      return;}
      ,error: (err) =>{this.busystatus=false;
        this.studentservice.log(err.error.message);
        this.feeForm.reset();
        return;}});
     
     
       }


    if (this.category == 'newadm') {

      this.subs.add=this.studentservice.getAdmissionDetail(myfeeform).subscribe (
        { next:(res:any)=>{this.show = true;
   console.log("feeform",res);
          let totalfee:any =res[0].amount;
         //this.f['feeamount'].setValue(res[0].appfee);
         this.f['feeamount'].setValue(res[0].amount);
         this.f['studentname'].setValue(res[0]['studentname']);
         this.f['applicationnumber'].setValue(res[0]['applicationnumber']);
         this.f['branchid'].setValue(res[0]['branchid']);
         this.f['programid'].setValue(res[0]['programid']);
         this.f['semestercode'].setValue(res[0]['semestercode']);
         this.f['feetype'].setValue(res[0]['feetype']);
         this.f['semesterstartdate'].setValue(res[0]['semesterstartdate']);
         this.f['semesterenddate'].setValue(res[0]['semesterenddate']);
         this.f['entityid'].setValue(res[0]['entityid']);
         this.f['programname'].setValue(res[0]['programname']);

         this.busystatus=false;
         this.studentservice.clear();

      



     
        this.rectype="A";
    const otherdet = new OtherDetail() ;
    otherdet.category=this.category;
    otherdet.rollnumber=this.f['applicationnumber'].value;
    otherdet.studentname=this.f['studentname'].value;
    otherdet.programname=this.f['programname'].value;
    otherdet.rectype=this.rectype;
    otherdet.semesterstartdate=this.f['semesterstartdate'].value;
    otherdet.semesterenddate=this.f['semesterenddate'].value;
    otherdet.latefee=this.f['latefee'].value;
    otherdet.entityid=this.f['entityid'].value;
    otherdet.programid=this.f['programid'].value;
    otherdet.semester=this.f['semestercode'].value;
    otherdet.feepending=this.f['feepending'].value;
    otherdet.feetype=this.f['feetype'].value;



         this.myurl=this.myurl+"?"+"totalfee="+totalfee+"&"+"Otherdetail="+otherdet.otherdetailforcontinue() ;
         return;}
         ,error: (err) =>{this.busystatus=false;
           this.studentservice.log(err.error.message);
           this.feeForm.reset();
           return;}});




      
    }


  }

}
