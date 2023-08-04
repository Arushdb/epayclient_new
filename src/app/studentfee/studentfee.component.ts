import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyItem } from '../interfaces/my-item';
import { StudentService } from '../services/student.service';
import { SubscriptionContainer } from 'src/app/shared/subscription-container';
import { Location } from '@angular/common';


@Component({
  selector: 'app-studentfee',
  templateUrl: './studentfee.component.html',
  styleUrls: ['./studentfee.component.css']
})
export class StudentfeeComponent implements OnInit {
  //myurl ="http://localhost:8080/epay/makepayment";
  //myurl ="https://admission.dei.ac.in:8443/epay/makepayment";

  myurl = this.studentservice.url;
 
  feepending!: string;
  

 
  feeForm: FormGroup =  Object.create(null);
  busystatus:boolean=false;
  show!: boolean;

  subs = new SubscriptionContainer();
  spinnerstatus: boolean = false;
  submitted!: boolean;
  encryptstr:string="";
  category: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private studentservice: StudentService,
   
    private location: Location,
    private _Activatedroute: ActivatedRoute,


    private elementRef: ElementRef) { }

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
    this.feepending = "";
    this.show = false;
    this.submitted = false;

    this.subs.add = this._Activatedroute.data.subscribe(data => {

      
      this.category=data['cat'];
    });

    
    this.myurl = this.studentservice.url+'/makepayment';
    
    



    this.feeForm = this.formBuilder.group({
  
      rollnumber: ['',[Validators.required,Validators.minLength(6)]],
    
      semester: new FormControl({value:'',diabled:"show"},Validators.required),  //[{value:'',disabled},Validators.required],
     
      programname: [''],
      studentname: [''],
      feeamount: [''],
      latefee: [''],
      labfee: [''],
      totalfee: [''],
      pendingsemester: [''],
      trx:[''],
      semesterstartdate:[''],
      semesterenddate:[''],
      entityid:[''],
      programid:[''],
      feepending:['']




    });

   // Object.freeze(this.feeForm);
    console.log("aftwr",this.feeForm);
  }

  submit(form:any) {
    //Object.freeze(this.feeForm);
    this.submitted=true;
    if (form.invalid)
      return;
    let myfeeform: any;
    myfeeform = this.feeForm.getRawValue();
    this.busystatus=true

     ////

this.subs.add=this.studentservice.getStudentDetail(myfeeform).subscribe (
  { next:(res:any)=>{this.show = true;
    this.show = true;

    let totalfee: string="";
    let otherdetail:string="";
    totalfee = String(parseFloat(res[0].amount) + parseFloat(res[0]['labfee']) + parseFloat(res[0]['latefee']));
    this.f['feeamount'].setValue(res[0].amount);
   
   
    this.f['studentname'].setValue(res[0]['studentname']);
    this.f['studentname'].setValue(res[0]['studentname']);
    this.f['latefee'].setValue(res[0]['latefee']);
    this.f['labfee'].setValue(res[0]['labfee']);
    this.f['programname'].setValue(res[0]['programname']);
    this.f['pendingsemester'].setValue(res[0].semestercode);
    this.f['semesterstartdate'].setValue(res[0].semesterstartdate);
    this.f['semesterenddate'].setValue(res[0].semesterenddate);
    this.f['entityid'].setValue(res[0].entityid);
    this.f['programid'].setValue(res[0].programid);
    this.f['feepending'].setValue(res[0].feepending);

    this.f['totalfee'].setValue(totalfee);
  

debugger;
    this.feepending = res[0].feepending;

    otherdetail=(this.category +','+this.f['rollnumber'].value+','+res[0]['studentname']+
    ','+res[0]['programname']+','+"R" +','+this.f['semesterstartdate'].value
    +','+this.f['semesterenddate'].value  +','+this.f['latefee'].value
    +','+this.f['entityid'].value
    +','+this.f['programid'].value
    +','+this.f['pendingsemester'].value
    +','+this.f['feepending'].value
  
    );

    this.myurl=this.myurl+"?"+"totalfee="+totalfee+"&"+"Otherdetail="+otherdetail ;
    
debugger;

    //this.feeForm.get('feeamount').setValue(res[0].amount);

     
    this.busystatus=false;
   this.studentservice.clear();
   return;}
   ,error: (err) =>{this.busystatus=false;
   
    
    this.studentservice.log(err.error.message);
    this.feeForm.reset();
    this.busystatus=false;

     return;}});


  }

  
}

