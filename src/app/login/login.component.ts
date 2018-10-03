import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import {GlobalServiceService}from'../global-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    otp:FormGroup;
    forgotpasswordForms:FormGroup;   
    loading:boolean=false;
    user:any;
    dashbord:boolean=false;
    requestType : string;
    loginFor:boolean=true;
    loginUI :boolean=false;
  
  constructor(
    private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        public globalService:GlobalServiceService,
        public ng4LoadingSpinnerService:Ng4LoadingSpinnerService
        ) { 
       this.dashbord=this.globalService.isLogedIn();
      
        }

        loginUi(type:any){
           this.loginFor=false;
           this.loginUI=true;
           this.requestType=type;
        }
        loginForUI(){
             this.loginFor=true;
             this.loginUI=false;
        }

          ngOnInit() {

             this.loginFormInit();
             this.otpFormInit();
             this.forgotPaswordFormInit();
          }

//////////////////////////validation//////////////////////////////////////////////////////////////////
          loginFormInit(){
            this.loginForm = this.fb.group({
                   email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
                   password : new FormControl('',Validators.required),
                   requestType : new FormControl('')
              });
          }

          otpFormInit(){
                 this.otp = this.fb.group({
                  'otp': new FormControl('',Validators.compose([Validators.required]))
                  
              })
          }

          forgotPaswordFormInit(){
                 this.forgotpasswordForms = this.fb.group({
                  requestType : new FormControl(''),
                  emailId : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
                  
              })
          }
          
          validate(e){
              // if(e.target.value.length<11){
             //  return true;
            // }else{
            //   return false;
            // }
            // debugger;
            // if(e.keyCode<=57||e.keyCode>=48){
             //  //e.preventDefault();
            // }else{
             //  return false;
            // }
           
          }
///////////////////////////////////////validation end//////////////////////////////////////////////

///////////////////////////////login logout///////////////////////////////////////////////////////
        login(value){           
          this.loading=true;
          this.ng4LoadingSpinnerService.show();      
          const url = this.globalService.basePath + 'api/login';
          this.loginForm.value.requestType=this.requestType;
          this.globalService.PostRequestUnautorized(url,this.loginForm.value).subscribe((response) => { 
                if(response[0].json.status==200){            
                    this.ng4LoadingSpinnerService.hide(); 
                    this.loading = false;
                    this.globalService.showNotification(response[0].json.message,2);
                    let type = response[0].json.data;
                    this.checkLoginType(type);
                     
                    
                }else{ 
                  this.ng4LoadingSpinnerService.hide();
                  this.loading = false;
                  this.loginForm.reset();
                  this.globalService.showNotification(response[0].json.message,4); 
                }
           });
          }

          checkLoginType(type){
            switch (this.requestType) {
              case "admin":
                localStorage.setItem('admin',JSON.stringify(type));
                this.router.navigate(['/admin/dashboard']);
              break;
              
              case "patient":
                localStorage.setItem('patient',JSON.stringify(type));
                this.router.navigate(['/patient/dashboard']);
              break;

              case "doctor":
                localStorage.setItem('doctor',JSON.stringify(type));
                this.router.navigate(['/doctor/viewpatients']);
              break;
              case "labs":
                localStorage.setItem('labs',JSON.stringify(type));
                this.router.navigate(['/labs/uploadbill']);
              break;
              case "hospital":
                localStorage.setItem('hospital',JSON.stringify(type));
                this.router.navigate(['/hospital/dashboard']);
              break;
              case "pharmacy":
                localStorage.setItem('pharmacy',JSON.stringify(type));
                this.router.navigate(['/pharmacy/uploadbill']);
              break;
              default:                
              break;
            }
          }

          verifyOtp(value){
            this.ng4LoadingSpinnerService.show();            
            const url = this.globalService.basePath + 'verify'; 
            value.mobile=this.user.mobile;
            this.globalService.PostRequestUnautorized(url,value).subscribe((response) => { 
            if(response[0].json.statusCode==200){
              this.otp.reset(); 
              $('#exampleModalCenter').modal('hide');
              localStorage.setItem('currentUser', JSON.stringify(this.user));
                 this.user=JSON.parse(localStorage.getItem('currentUser'));
                 this.globalService.showNotification(response[0].json.message,2);
                 this.router.navigate(['/admin/dashboard']);
                 this.ng4LoadingSpinnerService.hide();      
                               
                 }else{                 
                      this.otp.reset();
                      this.globalService.showNotification(response[0].json.message,4); 
                      this.ng4LoadingSpinnerService.hide();      
                     
                       }
             
              })
          }

          openModalForforgotpassword(){
            this.loginForm.reset(); 
               $('#forgotPasswordModal').modal('show');
          }

          forgotpassword(){
            $('#forgotPasswordModal').modal('hide');
            //const url = this.globalService.basePath + 'verify';             
            this.forgotpasswordForms.value.requestType=this.requestType;
            console.log("this.forgotpasswordForms.value = = "+JSON.stringify(this.forgotpasswordForms.value));
            // this.globalService.PostRequestUnautorized(url,this.forgotpasswordForms.value).subscribe((response) => { 
            // if(response[0].json.statusCode==200){
            //   this.forgotpasswordForms.reset(); 
           
            //   localStorage.setItem('currentUser', JSON.stringify(this.user));
            //      this.user=JSON.parse(localStorage.getItem('currentUser'));
            //      this.globalService.showNotification(response[0].json.message,2);
            //      this.router.navigate(['/admin/dashboard']);
            //      this.ng4LoadingSpinnerService.hide();      
                               
            //      }else{                 
            //           this.otp.reset();
            //           this.globalService.showNotification(response[0].json.message,4); 
            //           this.ng4LoadingSpinnerService.hide();      
                     
            //            }
             
            //   })
          }


}
