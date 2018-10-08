import { Component, OnInit,NgModule, ElementRef } from '@angular/core';

import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-doctorrequest',
  templateUrl: './doctorrequest.component.html',
  styleUrls: ['./doctorrequest.component.scss']
})
export class DoctorrequestComponent implements OnInit {
// doctorForm : FormGroup;
user : any ;
loading : boolean = false;
aadharNo : any;
requestForm : FormGroup;
otpForm : FormGroup;
  constructor(public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,
    private http: Http) {
       this.user=JSON.parse(localStorage.getItem('doctor'));
            var status = this.globalService.isdoctorLogedIn();
                if(status==false){
                  this.router.navigateByUrl('/login');
                }
     }

  ngOnInit() {
    var data = localStorage.getItem('doctor');
    if(data) this.user = JSON.parse(data);
    // this.doctorFormInit();
    this.requestFormInit();
    this.otpFormInit();
  }

  openModel(){
     $('#exampleModal1').modal('show');
     this.requestForm.reset();
  }

  sendPullEHRrequestByDoctor(){
    if(this.aadharNo){
   this.loading=true;
   let postData = { doctorId : this.user._id,aadharNo :this.aadharNo};
   const url=this.globalService.basePath+'doctor/sendPullEHRrequestByDoctor';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        $('#exampleModal1').modal('hide');
        $('#otpModel').modal('show');
        this.globalService.showNotification(res.json().message,2);
        // this.router.navigate(['/'])
      }else{
        $('#exampleModal1').modal('show');
        this.globalService.showNotification(res.json().message,4);
      }
    });
 }else{
   this.globalService.showNotification('Please send Mobile No!.',4);
 }
    
  }

  requestFormInit(){
    this.requestForm = this.fb.group({
      aadharNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{12,12}$/)]))
    });
  }

  otpFormInit(){
    this.otpForm = this.fb.group({
      otp : new FormControl('',Validators.required)
    });
  }

 sendOTP(){
   this.loading=true;
   let postData = { doctorId : this.user._id,multichainAddress:this.user.multichainAddress ,aadharNo :this.aadharNo,OTP : this.otpForm.value.otp};
   const url=this.globalService.basePath+'doctor/verifyEhrByDoctor';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        $('#otpModel').modal('hide');
        this.router.navigate(['/seeEHR/'+this.aadharNo]);
        this.globalService.showNotification(res.json().message,2);
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
 }

  reset(){
    this.requestForm.reset();
  }
  
  minus(e){
          if (e.keyCode === 189 ) {return false;}
  }

}
