import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { SubscriptionContainer } from '../shared/subscription-container';
import { Location, UpperCasePipe } from '@angular/common';
import { AgRadioButton } from 'ag-grid-community';

@Component({
  selector: 'app-certificatefee',
  templateUrl: './certificatefee.component.html',
  styleUrls: ['./certificatefee.component.css']
})
export class CertificatefeeComponent implements OnInit {

  @ViewChild('radio1')
  public radio1: AgRadioButton = new AgRadioButton;
    @ViewChild('radio2')
  public radio2: AgRadioButton = new AgRadioButton;

  certForm!: FormGroup;
  labelrollno="Roll Number";
  labeladdress="Address as per adhar card";
  uncheck=false;
  submitted = false;
  show: boolean = false;
  feetype: any;
  subs = new SubscriptionContainer();
  busystatus: boolean = false;
  title: string | undefined;
  certificatetype: any;
   

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private studentservice: StudentService,
    private location: Location,

    private _Activatedroute: ActivatedRoute,
    private elementRef: ElementRef
  ) { }

  get f() {

    return this.certForm.controls;
  }

  onCheckboxChange(event: any) {
    debugger;
    if (event.target.checked) {
      this.f['bypost'].setValue("Y");
    } else {
      this.f['bypost'].setValue("N");
    }
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

      this.certificatetype = data['certificatetype'];
    });

    this.certForm = this.formBuilder.group({

      rollno: [''],
      enrolno: ['', Validators.minLength(6)],
      studentname: [''],
      programname: [''],
      address: ['',Validators.required],
      pincode: ['', [Validators.required,Validators.minLength(6)]],
      dob: ['', Validators.required],
      phone: ['', [Validators.required,Validators.minLength(10)]],
      feeamount: [''],
      mode: ['', Validators.required],
      type: ['', Validators.required],
  
   
      sm1: [''],
      sm2: [''],
      sm3: [''],
      sm4: [''],
      sm5: [''],
      sm6: [''],
      sm7: [''],
      sm8: [''],
      sm9: [''],
      sm10: [''],
      sm11: [''],
      sm12: [''],
      

    });

    this.f['pincode'].setValidators([Validators.minLength(6),Validators.required]);
      this.f['pincode'].setValidators([Validators.minLength(6),Validators.required]);
      this.f['mode'].setValidators([Validators.required]);


    if (this.certificatetype == 'mig') {
      this.title = "Migration Certificate";
      this.labelrollno="Roll Number (Last Degree)";
      this.f['enrolno'].setValidators([Validators.minLength(6),Validators.required]);
      

    }


    if (this.certificatetype == 'deg') {
      this.title = "Duplicate Degree / Diploma";
      this.f['rollno'].setValidators([Validators.minLength(6),Validators.required]);
      this.f['enrolno'].setValidators([Validators.minLength(6),Validators.required]);
      //this.f['rollno'].setValidators(Validators.required);

    }
    if (this.certificatetype == 'trn') {
      this.title = "Official Transcript";
      this.f['enrolno'].setValidators([Validators.minLength(6),Validators.required]);


    } 
    if (this.certificatetype == 'pro') {
      this.title = "Provisional Certificate";
      this.f['rollno'].setValidators([Validators.minLength(6),Validators.required]);
      this.f['enrolno'].setValidators([Validators.minLength(6),Validators.required]);

    }
    if (this.certificatetype == 'res') {
      this.title = "Duplicate Result Card";
      this.f['rollno'].setValidators([Validators.minLength(6),Validators.required]);
      this.f['enrolno'].setValidators([Validators.minLength(6),Validators.required]);

    }

  }

  submit(form: any) {
     debugger;
     this.submitted = true;
    this.f['rollno'].setValue(String(this.f['rollno'].value).toUpperCase());
    this.f['type'].setValue(this.certificatetype);
    //this.show=true;
  
    if (form.invalid) {
      this.resetCheckboxes();
      this.show=false;
      return;
    }
       
    let myfeeform: any;
    myfeeform = this.certForm.getRawValue();
    this.busystatus = true;

////

this.subs.add=this.studentservice.getcertificate(myfeeform).subscribe (
  { next:(res:any)=>{this.show = true;

   this.f['feeamount'].setValue(res[0].amount);
   this.f['studentname'].setValue(res[0]['studentname']);
   this.f['programname'].setValue(res[0]['programname']);
   this.busystatus=false;
   return;}
   ,error: (err) =>{this.busystatus=false;
     this.studentservice.log(err.error.message);
     this.certForm.reset();
     this.resetCheckboxes();
     this.show=false;

     return;}});




///

    // this.subs.add = this.studentservice.getcertificate(myfeeform).subscribe(res => {
    //   this.show = true;
    //   this.disablebuttons();
      

    //   this.f['feeamount'].setValue(res[0].amount);
    //   this.f['studentname'].setValue(res[0]['studentname']);
    //   this.f['programname'].setValue(res[0]['programname']);
    //   this.busystatus = false;
    

    // }, err => {
    //   console.log(err);
    //   this.busystatus = false;
    //   this.studentservice.log(err.error.message);
    //   this.certForm.reset();
    //   this.resetCheckboxes();
    //   this.show=false;
      
      
  
      
    // });

  }
  disablebuttons(){
    this.certForm.get('sm1')?.disable();
    this.certForm.get('sm2')?.disable();
    this.certForm.get('sm3')?.disable();
    this.certForm.get('sm4')?.disable();
    this.certForm.get('sm5')?.disable();
    this.certForm.get('sm6')?.disable();
    this.certForm.get('sm7')?.disable();
    this.certForm.get('sm8')?.disable();
    this.certForm.get('sm9')?.disable();
    this.certForm.get('sm10')?.disable();
    this.certForm.get('sm11')?.disable();
    this.certForm.get('sm12')?.disable();
    
    // this.certForm.get('sm1').disable({ onlySelf: true });
    // this.certForm.get('sm2').disable({ onlySelf: true });
    // this.certForm.get('sm3').disable({ onlySelf: true });
    // this.certForm.get('sm4').disable({ onlySelf: true });
    // this.certForm.get('sm5').disable({ onlySelf: true });
    // this.certForm.get('sm6').disable({ onlySelf: true });
    // this.certForm.get('sm7').disable({ onlySelf: true });
    // this.certForm.get('sm8').disable({ onlySelf: true });
    // this.certForm.get('sm9').disable({ onlySelf: true });
    // this.certForm.get('sm10').disable({ onlySelf: true });
    // this.certForm.get('sm11').disable({ onlySelf: true });
    // this.certForm.get('sm12').disable({ onlySelf: true });
    // this.certForm.get('mode').disable({ onlySelf: true });

  }
    
 
  
  onCheckbox1Change(event: any) {

    if (event.target.checked) {
      
      this.f['sm1'].setValue(true);
     
    } else {
      this.f['sm1'].setValue(false);
      
    }
  }
  onCheckbox2Change(event: any) {

    if (event.target.checked) {
      this.f['sm2'].setValue(true);
     
    } else {
      this.f['sm2'].setValue(false);
     
    }
  }
  onCheckbox3Change(event: any) {

    if (event.target.checked) {
      this.f['sm3'].setValue(true);
    } else {
      this.f['sm3'].setValue(false);
    }
  }
  onCheckbox4Change(event: any) {

    if (event.target.checked) {
      this.f['sm4'].setValue(true);
    } else {
      this.f['sm4'].setValue(false);
    }
  }
  onCheckbox5Change(event: any) {

    if (event.target.checked) {
      this.f['sm5'].setValue(true);
    } else {
      this.f['sm5'].setValue(false);
    }
  }
  onCheckbox6Change(event: any) {

    if (event.target.checked) {
      this.f['sm6'].setValue(true);
    } else {
      this.f['sm6'].setValue(false);
    }
  }
  onCheckbox7Change(event: any) {

    if (event.target.checked) {
      this.f['sm7'].setValue(true);
    } else {
      this.f['sm7'].setValue(false);
    }
  }
  onCheckbox8Change(event: any) {

    if (event.target.checked) {
      this.f['sm8'].setValue(true);
    } else {
      this.f['sm8'].setValue(false);
    }
  }
  onCheckbox9Change(event: any) {

    if (event.target.checked) {
      this.f['sm9'].setValue(true);
    } else {
      this.f['sm9'].setValue(false);
    }
  }
  onCheckbox10Change(event: any) {

    if (event.target.checked) {
      this.f['sm10'].setValue(true);
    } else {
      this.f['sm10'].setValue(false);
    }
  }
  onCheckbox11Change(event: any) {

    if (event.target.checked) {
      this.f['sm11'].setValue(true);
    } else {
      this.f['sm11'].setValue(false);
    }
  }
  onCheckbox12Change(event: any) {

    if (event.target.checked) {
      this.f['sm12'].setValue(true);
    } else {
      this.f['sm12'].setValue(false);
    }
  }

  resetCheckboxes(){
    this.f['sm1'].setValue(false);
    this.f['sm2'].setValue(false);
    this.f['sm3'].setValue(false);
    this.f['sm4'].setValue(false);
    this.f['sm5'].setValue(false);
    this.f['sm6'].setValue(false);
    this.f['sm7'].setValue(false);
    this.f['sm8'].setValue(false);
    this.f['sm9'].setValue(false);
    this.f['sm10'].setValue(false);
    this.f['sm11'].setValue(false);
    this.f['sm12'].setValue(false);

  }

}


