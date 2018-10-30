import { Component, OnInit,NgModule, ElementRef } from '@angular/core';

import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $: any;

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.scss']
})
export class AddpatientComponent implements OnInit {
doctorForm : FormGroup;
loading : boolean = false;
user : any ;
otpForm : FormGroup;
mobileNo : any;
bloodgroup:any=[];
patientsImage:any;
  constructor(public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,
    public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,
    private http: Http) {
    this.user=JSON.parse(localStorage.getItem('hospital'));
            var status = this.globalService.ishospitalLogedIn();
                if(status==false){
                  this.router.navigateByUrl('/login');
                }
    this.otpFormInit();
  }
  otpFormInit(){
    this.otpForm = this.fb.group({
      OTP : new FormControl('',Validators.required)
    });
  }

  ngOnInit() {
    this.doctorFormInit();
    this.getBloodGroup();
    var data = localStorage.getItem('hospital');
    if(data) this.user = JSON.parse(data);
  }

  getBloodGroup(){
     const url=this.globalService.basePath+'patient/getBloodGroup';
     this.globalService.PostRequestUnautorized(url).subscribe(response=>{
       console.log("response",response);
      if(response[0].json.status===200){
         this.bloodgroup=response[0].json.data;
      }else{
         this.globalService.showNotification(response.json().message,4);
      }
    });
  }

 //   sendOTP(){
 //   this.loading=true;
 //   this.ng4LoadingSpinnerService.show();
   // let postData = { doctorId : this.user._id,mobileNo :this.mobileNo,OTP : this.otpForm.value.otp};
 //   const url=this.globalService.basePath+'doctor/sendOTP';
 //   this.http.post(url,postData).subscribe((res)=>{
 //      this.loading=false;
 //      if(res.json().status===200){
 //        this.ng4LoadingSpinnerService.hide();
 //        $('#otpModel').modal('hide');
 //        this.globalService.showNotification(res.json().message,2);
 //        // this.router.navigate(['/'])
 //      }else{
 //        this.globalService.showNotification(res.json().message,4);
 //      }
 //    });
 // }


 sendOTP(){
    this.loading=true;
    var url ='';
    var postData = {doctorId : this.user._id,OTP : this.otpForm.value.OTP};
    console.log("data",postData);
      url=this.globalService.basePath+'doctor/verifyPatientSignupOTP';
      this.ng4LoadingSpinnerService.show();
    this.http.post(url,postData).subscribe((res)=>{
      this.ng4LoadingSpinnerService.hide();
       this.loading=false;
       if(res.json().status===200){
         debugger
         $('#otpModel').modal('hide');

         this.globalService.showNotification(res.json().message,2);
         this.doctorForm.reset();
        this.router.navigate(['/doctor/viewpatients']);
         // this.router.navigate(['/login'])
       }else{
         $('#otpModel').modal('show');
         this.globalService.showNotification(res.json().message,4);
       }
     });
 }
  doctorFormInit(){
    this.doctorForm = this.fb.group({
      firstName : new FormControl('',Validators.required),
      lastName : new FormControl('',Validators.required),
      email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
      gender : new FormControl('',Validators.required),
      mobileNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{10,10}$/)])),
      city : new FormControl('',Validators.required),
      dob : new FormControl('',Validators.required),
      address : new FormControl('',Validators.required),
      bloodgroup : new FormControl(''),
      age : new FormControl('', Validators.required),
      description: new FormControl(''),
      image : new FormControl(''),
      aadharNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^((?!(0))[0-9]{12,12})$/)])),
      password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
      confirmPassword:new FormControl('', Validators.required)}, { validator: this.matchingPasswords('password', 'confirmPassword')
    })
  }

matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

  uploadImage(event){
       let reader = new FileReader();
       let file = event.target.files[0];
       reader.onloadend = (e:any) => {    
      
       this.patientsImage=e.target.result;  
      
      
     }
      reader.readAsDataURL(file)
   }

  sendRequest(){
   this.loading=true;
    this.doctorForm.value.image = this.patientsImage;  
   let postData = this.doctorForm.value;
   const url=this.globalService.basePath+'doctor/addPatient';
   this.ng4LoadingSpinnerService.show();
   this.http.post(url,postData).subscribe((res)=>{
     this.ng4LoadingSpinnerService.hide();
      this.loading=false;
      if(res.json().status===200){
        this.globalService.showNotification(res.json().message,2);
        $('#otpModel').modal('show');
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }



  minus(e){
          if (e.keyCode === 189 ) {return false;}
  }

  reset(){
    this.doctorForm.reset();
  }
}
