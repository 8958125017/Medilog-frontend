import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import { Http } from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $: any;
import  * as moment from 'moment';


@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['./adddoctor.component.scss']
})
export class AdddoctorComponent implements OnInit {
  accountType:string="doctor";
  doctorForm : FormGroup;
  otpForm : FormGroup;
  loading : boolean = false;
  user :any;
  degreee:any=[];
  bloodgroup:any=[];
  specialities:any=[];
  departments:any=[];
  constructor(public globalService:GlobalServiceService,
    private router: Router,
    private fb: FormBuilder,
    public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,
    private http: Http) { 

    var data = localStorage.getItem('hospital');
    if(data) this.user = JSON.parse(data);
    this.otpFormInit();
    var status = this.globalService.ishospitalLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
  }
  
  ngOnInit() {
    this.doctorFormInit();
    this.getDegree();
    this.getBloodGroup();
    this.getSpecialities();
    this.getDepartments();
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

  doctorFormInit(){
    this.doctorForm = this.fb.group({
	      firstName : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
	      lastName : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
	      email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
	      gender : new FormControl('',Validators.required),
	      mobileNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{10,10}$/)])),
	      city : new FormControl(''),
	      department : new FormControl('',),
	      designation : new FormControl(''),
	      dob : new FormControl('',Validators.required),
	      degree : new FormControl('',Validators.required),
	      age : new FormControl(''),
	      practiceSpecialty : new FormControl(''),
	      password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
	      bloodgroup : new FormControl(''),
	      image : new FormControl(''),
        aadharNo : new FormControl('',Validators.compose([Validators.required,Validators.minLength(12), Validators.maxLength(12)])),
	      confirmPassword:new FormControl('', Validators.required)}, { validator: this.matchingPasswords('password', 'confirmPassword') });
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
	          this.doctorForm.value.image = e.target.result;
	     }
	      reader.readAsDataURL(file)
   }

   doctorSendRequestToAdmin(){
	   this.loading=true;
	   let postData = this.doctorForm.value;
     this.doctorForm.value.hospitalId = this.user._id;
     debugger
     this.ng4LoadingSpinnerService.show();  
	   const url=this.globalService.basePath+'doctor/doctorSendRequestToAdmin';
	   this.globalService.PostRequest(url,postData).subscribe((res)=>{
	      this.loading=false;
	      if(res.json().status===200){
	        this.globalService.showNotification(res.json().message,2);
          $('#otpModel').modal('show');
          this.ng4LoadingSpinnerService.hide();  
	        // this.router.navigate(['/hospital/viewdoctor'])
	      }else{
	        this.globalService.showNotification(res.json().message,4);
	      }
	    });
  }

  reset(){
        this.doctorForm.reset();       
  }

   sendOTP(){
   this.loading=true;
   let postData = { hospitalId : this.user._id,multichainAddress:this.user.multichainAddress,OTP : this.otpForm.value.otp};
   const url=this.globalService.basePath+'doctor/verifyDoctorSignupOTP';
   this.ng4LoadingSpinnerService.show();  
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        $('#otpModel').modal('hide');
        this.router.navigate(['/hospital/viewdoctor']);
        this.globalService.showNotification(res.json().message,2);
        this.ng4LoadingSpinnerService.hide();  
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
 }

  otpFormInit(){
    this.otpForm = this.fb.group({
      otp : new FormControl('',Validators.required)
    });
  }


  minus(e){
          if (e.keyCode === 189 ) {return false;}
  }




}
