import { Component, OnInit,NgModule, ElementRef } from '@angular/core';

import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $: any;

@Component({
  selector: 'app-viewpatient',
  templateUrl: './viewpatient.component.html',
  styleUrls: ['./viewpatient.component.scss']
})
export class ViewpatientComponent implements OnInit {
loading: boolean = false;
patients : any[] = [];
user  : any;
aadharNo : any;
p: number = 1;
requestForm : FormGroup;
otpForm : FormGroup;
  constructor(public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,
    public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,
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
    this.getAllPatient();
    this.requestFormInit();
    this.otpFormInit();
  }

  getAllPatient(){
   this.loading=true;
   this.ng4LoadingSpinnerService.show();
   let postData = { doctorId : this.user._id,stream : "patient",multichainAddress : this.user.multichainAddress};
   const url=this.globalService.basePath+'doctor/getAllPatient';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.patients = res.json().data;
        
        this.ng4LoadingSpinnerService.hide();
        this.loading =false;
      }else{
        this.globalService.showNotification(res.json().msg,4);
      }
    });
  }


  deletePatient(patient){
    // Pull from the array
    this.loading=true;
   let postData = { doctorId : this.user._id,patientId : patient._id};
   const url=this.globalService.basePath+'doctor/deletePatientByDoctor';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.globalService.showNotification(res.json().message,2);
        this.getAllPatient();
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

  seeEHRhistory(patient){
    this.router.navigate(['/doctor/seeEHR/'+patient.aadharNo+'/'+patient.firstName+' '+patient.lastName]);
  }

  createPrescription(patient){
   this.router.navigate(['/doctor/createprescription/'+patient.aadharNo]); 
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
        $('#exampleModal1').modal('hide');
      if(res.json().status===200){      
        $('#otpModel').modal('show');
        this.globalService.showNotification(res.json().message,2);
        // this.router.navigate(['/'])
      }else{
         this.router.navigate(['/doctor/addpatient'])
         this.globalService.showNotification(res.json().message,4);
      //  $('#exampleModal1').modal('show');       
      }
    });
 }else{
   this.globalService.showNotification('Please send Mobile No!.',4);
 }
    
  }

  requestFormInit(){
    this.requestForm = this.fb.group({
      aadharNo : new FormControl('',Validators.compose([Validators.pattern(/^[0-9]{12,12}$/)]))
    });
  }

  otpFormInit(){
    this.otpForm = this.fb.group({
      otp : new FormControl('',Validators.required)
    });
  }

 sendOTP(){
   this.loading=true;
   let postData = { multichainAddress:this.user.multichainAddress ,aadharNo :this.aadharNo,OTP : this.otpForm.value.otp};
   const url=this.globalService.basePath+'doctor/verifyEhrByDoctor';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        $('#otpModel').modal('hide');
        this.otpForm.reset();
         this.getAllPatient();
        // this.router.navigate(['/seeEHR/'+this.aadharNo]);
        this.globalService.showNotification(res.json().message,2);
      }else{
        this.otpForm.reset();
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
