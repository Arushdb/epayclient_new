import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionContainer } from '../shared/subscription-container';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Location } from '@angular/common';
import { OtherDetail } from '../other-detail';

@Component({
  selector: 'app-viewfeestatus',
  templateUrl: './viewfeestatus.component.html',
  styleUrls: ['./viewfeestatus.component.css']
})
export class ViewfeestatusComponent {
  myurl = this.studentservice.url;
  feeForm!: FormGroup;

  submitted = false;

  show!: boolean;
  feetype: any;
  subs = new SubscriptionContainer();
  busystatus: boolean = false;
  title!: string;
  category: string = "";
  rectype: string = "";
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


   
    });

   
    this.feeForm = this.formBuilder.group({

      ATRN: [''],
      feeamount: ['0',Validators.min(100)],
      merchantorderno: [''],

    });

    


  }

  submit(form: any) {



    //this.show=true;
    this.submitted = true;
    if (form.invalid)
      return;

     if( this.f['merchantorderno'].value=="" && this.f['ATRN'].value==""){
      this.studentservice.log("Please fill up details" );
      this.submitted = false;
      return;
     }
      
      


      this.myurl = this.studentservice.url+'/viewfeestatus';
      this.myurl=this.myurl+"?"+"merchantorderno="+this.f['merchantorderno'].value+"&"+"feeamount="+this.f['feeamount'].value
      +"&"+"ATRN="+this.f['ATRN'].value ;
      let elem:any = document.getElementById("linkid");
      console.log("fee amount"+this.f['feeamount'].value);
      elem.setAttribute("merchantorderno",this.f['merchantorderno'].value);
      elem.setAttribute("feeamount",this.f['feeamount'].value);
      elem.setAttribute("ATRN",this.f['ATRN'].value);
      elem.setAttribute("href",this.myurl);
      document.getElementById("linkid")?.click();
      
     // this.feeForm.reset();


    
    


  }



}
