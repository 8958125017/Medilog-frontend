import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;
import  * as moment from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    allsignup : boolean=true;
    signupas : boolean=false;
    accountType:string;
    doctorForm : FormGroup;
    loading : boolean = false;
    user : any ;
    patientForm : FormGroup;
    hospitalForm : FormGroup;
    pharmacyForm : FormGroup;
    labForm : FormGroup;
    otpForm : FormGroup;
    degreee:any=[];
    bloodgroup:any=[];
    specialities:any=[];
    departments:any=[];
    hospitalImage:any;
    doctorImage:any;
    patientsImage:any;
    labImage:any;
    pharmacyImage:any;
  constructor(public globalService:GlobalServiceService,
    private router: Router,
    private fb: FormBuilder,
    private http: Http) {
     this.otpFormInit();
  }

  ngOnInit() {
    this.doctorFormInit();
    this.patientFormInit();
    this.hospitalFormInit();
    this.pharmacyFormInit();
    this.labFormInit();
    this.getDegree();
    this.getBloodGroup();
    this.getSpecialities();
    this.getDepartments();
    var data = localStorage.getItem('doctor');
    if(data) this.user = JSON.parse(data);

  }

  getDegree(){
    const url=this.globalService.basePath+'doctor/getDoctorDegree';
     this.globalService.PostRequestUnautorized(url).subscribe(response=>{
      if(response[0].json.status===200){
         this.degreee=response[0].json.data;
      }else{
         this.globalService.showNotification(response.json().message,4);
      }
    });
  }

  getBloodGroup(){
     const url=this.globalService.basePath+'patient/getBloodGroup';
     this.globalService.PostRequestUnautorized(url).subscribe(response=>{
      if(response[0].json.status===200){
         this.bloodgroup=response[0].json.data;
      }else{
         this.globalService.showNotification(response.json().message,4);
      }
    });
  }

  getSpecialities(){
     const url=this.globalService.basePath+'doctor/gettypedoctor';
     this.globalService.PostRequestUnautorized(url).subscribe(response=>{
      if(response[0].json.status===200){
         this.specialities=response[0].json.data;
      }else{
         this.globalService.showNotification(response.json().message,4);
      }
    });
  }

  getDepartments(){
     const url=this.globalService.basePath+'doctor/getDoctorCategory';
     this.globalService.PostRequestUnautorized(url).subscribe(response=>{
      if(response[0].json.status===200){
         this.departments=response[0].json.data;
      }else{
         this.globalService.showNotification(response.json().message,4);
      }
    });
  }

  otpFormInit(){
    this.otpForm = this.fb.group({
      OTP : new FormControl('',Validators.required)
    });
  }

  signupFor(type:any){
  	this.allsignup=false
    this.signupas=true;
    this.accountType=type;
  }

  allSignup(){
    this.allsignup=true
    this.signupas=false;
  }

  doctorFormInit(){
    this.doctorForm = this.fb.group({
      firstName : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
      lastName : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
      email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
      gender : new FormControl('',Validators.required),
      mobileNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{10,10}$/)])),
      city : new FormControl('',Validators.required),
      department : new FormControl('',Validators.required),
      designation : new FormControl('',Validators.required),
      description: new FormControl(''),
      address : new  FormControl('',Validators.required),
      dob : new FormControl('',Validators.required),
      degree : new FormControl('',Validators.required),
      age : new FormControl(''),
      practiceSpecialties : new FormControl(''),
      password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
      bloodgroup : new FormControl(''),
      image : new FormControl(''),
      aadharNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^((?!(0))[0-9]{12,12})$/)])),
      confirmPassword:new FormControl('', Validators.required)}, { validator: this.matchingPasswords('password', 'confirmPassword') });
  }

  patientFormInit(){
    this.patientForm = this.fb.group({
	      firstName: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
	      lastName: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
	      email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
	      password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
	      age: new FormControl('', Validators.required),
	      gender : new FormControl('',Validators.required),
	      mobileNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{10,10}$/)])),
	      city : new FormControl('',Validators.required),
        description: new FormControl(''),
        address : new  FormControl('',Validators.required),
	      dob : new FormControl('',Validators.required),
	      education : new FormControl(''),
	      bloodgroup : new FormControl(''),
        aadharNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^((?!(0))[0-9]{12,12})$/)])),
        image : new FormControl(''),
	      confirmPassword: new FormControl('', Validators.required),},{ validator: this.matchingPasswords('password', 'confirmPassword') })
  }

  hospitalFormInit(){
    this.hospitalForm = this.fb.group({
        name: new FormControl('',Validators.required),
        email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
        password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
        practiceSpecialties: new FormControl('', Validators.required),
        location : new FormControl('',Validators.required),
        contactNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{6,15}$/)])),
        city : new FormControl('',Validators.required),
        open : new FormControl('',Validators.required),
        close : new FormControl('',Validators.required),
        image : new FormControl(''),
        description: new FormControl(''),
        address : new  FormControl('',Validators.required),
        confirmPassword: new FormControl('', Validators.required),},{ validator: this.matchingPasswords('password', 'confirmPassword') })
  }

  pharmacyFormInit(){
    this.pharmacyForm = this.fb.group({
        name: new FormControl('',Validators.required),
        email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
        password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
        license: new FormControl('', Validators.required),
        contactNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{6,15}$/)])),
        city : new FormControl('',Validators.required),
        open : new FormControl('',Validators.required),
        close : new FormControl('',Validators.required),
        description: new FormControl(''),
        address : new  FormControl('',Validators.required),
        image : new FormControl(''),
        confirmPassword: new FormControl('', Validators.required),},{ validator: this.matchingPasswords('password', 'confirmPassword') })
  }

  labFormInit(){
    this.labForm = this.fb.group({
        name: new FormControl('',Validators.required),
        email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
        password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
        license : new FormControl('',Validators.required),
        contactNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{6,15}$/)])),
        city : new FormControl('',Validators.required),
        open : new FormControl('',Validators.required),
        close : new FormControl('',Validators.required),
        description: new FormControl(''),
        address : new  FormControl('',Validators.required),
        image : new FormControl(''),
        confirmPassword: new FormControl('', Validators.required),},{ validator: this.matchingPasswords('password', 'confirmPassword') })
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
       if(this.accountType=="doctor"){
           this.doctorImage=e.target.result;    
       }else if (this.accountType=="patient"){
         this.patientsImage=e.target.result;          
       }else if (this.accountType=="hospital"){
         this.hospitalImage=e.target.result;          
       }
       else if (this.accountType=="pharmacy"){
         this.pharmacyImage=e.target.result;          
       }
       else if (this.accountType=="labs"){
         this.labImage=e.target.result;          
       }
     }
      reader.readAsDataURL(file)
   }



  doctorSendRequestToAdmin(){
   this.loading=true;
   this.doctorForm.value.image=this.doctorImage;
   let postData = this.doctorForm.value;
   const url=this.globalService.basePath+'doctor/doctorSendRequestToAdmin';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.globalService.showNotification(res.json().message,2);
        $('#otpModel').modal('show');
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }


  patientSignup(){
   this.loading=true;
   this.patientForm.value.image=this.patientsImage;
   let postData = this.patientForm.value;
   const url=this.globalService.basePath+'doctor/addPatient';
   console.log("postData =  ="+JSON.stringify(postData));
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.globalService.showNotification(res.json().message,2);
        // this.router.navigate(['/login'])
        $('#otpModel').modal('show');
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

  hospitalSignup(){
   this.loading=true;
    this.hospitalForm.value.image=this.hospitalImage;
   let postData = this.hospitalForm.value;
   
   const url=this.globalService.basePath+'hospital/sendRequestToAdmin';
   console.log("postData =  ="+JSON.stringify(postData));
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.globalService.showNotification(res.json().message,2);
        this.router.navigate(['/login'])
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

  pharmacySignup(){
   this.loading=true;
   this.pharmacyForm.value.image=this.pharmacyImage;
   let postData = this.pharmacyForm.value;   
   const url=this.globalService.basePath+'pharmacy/pharmacySendRequestToAdmin';
   console.log("postData =  ="+JSON.stringify(postData));
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.globalService.showNotification(res.json().message,2);
        this.router.navigate(['/login'])
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

  labSignup(){
   this.loading=true;
   this.labForm.value.image=this.labImage;
   let postData = this.labForm.value;
   const url=this.globalService.basePath+'lab/labSendRequestToAdmin';
   console.log("postData =  ="+JSON.stringify(postData));
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.globalService.showNotification(res.json().message,2);
        this.router.navigate(['/login'])
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }



sendOTP(){
   this.loading=true;
   var url ='';
   let postData = {OTP : this.otpForm.value.OTP};
   if(this.doctorForm.value.aadharNo)  url=this.globalService.basePath+'doctor/verifyDoctorSignupOTP';
   if(this.patientForm.value.aadharNo)  url=this.globalService.basePath+'doctor/verifyPatientSignupOTP';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        $('#otpModel').modal('hide');
        this.globalService.showNotification(res.json().message,2);
        this.router.navigate(['/login'])
      }else{
        $('#otpModel').modal('show');
        this.globalService.showNotification(res.json().message,4);
      }
    });
}

  reset(){
        this.doctorForm.reset();
        this.patientForm.reset();
        this.hospitalForm.reset();
        this.pharmacyForm.reset();
        this.labForm.reset();
  }

  minus(e){
          if (e.keyCode === 189 ) {return false;}
  }

}
