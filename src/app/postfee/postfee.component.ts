import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { SubscriptionContainer } from '../shared/subscription-container';
import { Location } from '@angular/common';
import { OtherDetail } from '../other-detail';
import { AESEncryptDecryptService } from '../services/aesencrypt-decrypt.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-postfee',
  templateUrl: './postfee.component.html',
  styleUrls: ['./postfee.component.css'],
})
export class PostfeeComponent implements OnInit {
  feeForm!: FormGroup;
  myurl = this.studentservice.url;

  submitted = false;
  appno: string | null = '';

  show!: boolean;
  feetype: any;
  subs = new SubscriptionContainer();
  busystatus: boolean = false;
  title!: string;
  fieldlabel!: string;

  showappno!: boolean;
  showrollno!: boolean;
  showhostel!: boolean;
  category: any;
  rectype: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private studentservice: StudentService,
    private location: Location,
    private theAESEncryptDecryptService: AESEncryptDecryptService,
    private _Activatedroute: ActivatedRoute,
    private elementRef: ElementRef,
    private messageservice: MessageService
  ) {}

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
    debugger;
    this.title = 'Post Fee ';
    this.show = false;
    this.appno = this._Activatedroute.snapshot.paramMap.get('appno');
    //this._Activatedroute.snapshot.queryParamMap.get('appno');

    this.submitted = false;
    this.subs.add = this._Activatedroute.data.subscribe((data) => {
      this.category = data['cat'];
    });

    this.feeForm = this.formBuilder.group({
      applicationno: this.appno,
      //applicationno: ['',[Validators.required,Validators.minLength(8)]],
      studentname: [''],
      feeamount: [''],
    });

    this.f['applicationno'].setValidators([
      Validators.required,
      Validators.minLength(8),
    ]);
    this.myurl = this.studentservice.url + '/makepayment';

    this.submit(this.feeForm);
  }

  submit(form: any) {
    this.f['applicationno'].setValue(
      String(this.f['applicationno'].value).toUpperCase()
    );

    this.submitted = true;
    if (form.invalid) return;
    let myfeeform: any;
    myfeeform = this.feeForm.getRawValue();
    this.busystatus = true;
    let totalfee: string = '';

    ////

    this.subs.add = this.studentservice.getpostfee(myfeeform).subscribe({
      next: (res: any) => {
        this.show = true;

        this.busystatus = false;
        let message = res[0]['message'];

        if (message == 'REC') {
          this.messageservice.clear();
          this.messageservice.add('Fee already received');
          this.show = false;
          return;
        }

        this.studentservice.clear();
        this.f['feeamount'].setValue(res[0].appfee);
        this.f['studentname'].setValue(res[0]['studentname']);
        this.f['applicationno'].setValue(res[0]['applicationnumber']);

        //this.f['branchid'].setValue('');
        //this.f['programid'].setValue('');
        //this.f['semestercode'].setValue('');
        //this.f['feetype'].setValue('');
        //this.f['semesterstartdate'].setValue('');
        //this.f['semesterenddate'].setValue('');
        //this.f['entityid'].setValue('');
        //this.f['feepending'].setValue('');
        //this.f['programname'].setValue('');

        //*** Arush on 30-04-2025 */
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        console.log(formattedDate);
        this.rectype = 'A';
        const otherdet = new OtherDetail();
        otherdet.category = this.category;
        otherdet.rollnumber = this.f['applicationno'].value;
        otherdet.studentname = this.f['studentname'].value;
        otherdet.programname = '';
        otherdet.rectype = this.rectype;
        otherdet.semesterstartdate = formattedDate;
        otherdet.semesterenddate = formattedDate;
        otherdet.latefee = '';
        otherdet.entityid = '';
        otherdet.programid = '';
        otherdet.semester = '';
        otherdet.feepending = 'N';
        otherdet.feetype = 'TNTP';
        otherdet.defaulter = 'N';
        otherdet.entityName = 'None';
        otherdet.branchName = 'None';
        otherdet.branchid = 'None';
        otherdet.insuranceamount = 'None';

        totalfee = String(parseFloat(res[0].appfee));

        let encdata = this.theAESEncryptDecryptService.encrypt(
          otherdet.otherdetailforcontinue()
        );
        debugger;
        totalfee = this.theAESEncryptDecryptService.encrypt(totalfee);
        console.log('encData:' + encdata + 'Total fee:' + totalfee);
        this.myurl =
          this.myurl +
          '?' +
          'totalfee=' +
          totalfee +
          '&' +
          'Otherdetail=' +
          encdata;

        //**      */
        return;
      },
      error: (err) => {
        this.busystatus = false;

        this.busystatus = false;
        this.studentservice.log(err.error.message);
        this.feeForm.reset();

        return;
      },
    });
  }
}
