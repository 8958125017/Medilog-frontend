import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { GlobalServiceService}from'../../.././global-service.service';
declare var $: any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user:any;
fullUserProfile:any;
editProfile:boolean=true;
profileInfo:boolean=false;
private labForm:FormGroup;
private updatePasswordForm:FormGroup;
	

  constructor(private http: Http,
	            private route: ActivatedRoute,
	            private router: Router,
	            private fb: FormBuilder,
	            public globalService:GlobalServiceService,
	            public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) {
  			      this.user=JSON.parse(localStorage.getItem('labs'));
                   var status = this.globalService.islabsLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
	         }

 ngOnInit() {
	  	this.getUserProfile();
	  	this.labFormInit();
       this.updatePasswordFormInit();
	  }

	     getUserProfile(){
	       	let self = this;
                const url = this.globalService.basePath+'doctor/getProfile';
                let data ={key:this.user.name.toString(), requestType :'lab'}
                debugger
                this.globalService.PostRequestUnautorized(url,data)
              .subscribe((response) => { 
              	if(response[0].json.status==200){  
                        self.fullUserProfile=response[0].json.data;                       
                        this.fillUserProfile();	
                  // this.ng4LoadingSpinnerService.hide();
                   } else{
                      // this.ng4LoadingSpinnerService.hide();
                      this.globalService.showNotification(response[0].json.message,4);                     
                   }
                })
	          }

		fillUserProfile(){
                   this.labForm.controls['labId'].setValue(this.fullUserProfile._id?this.fullUserProfile._id:'NA');
			            this.labForm.controls['image'].setValue(this.fullUserProfile.image?this.fullUserProfile.image:'NA');
			            this.labForm.controls['name'].setValue(this.fullUserProfile.name);
			            this.labForm.controls['contactNo'].setValue(this.fullUserProfile.contactNo);
			            this.labForm.controls['email'].setValue(this.fullUserProfile.email);
			            this.labForm.controls['city'].setValue(this.fullUserProfile.city);
			            this.labForm.controls['license'].setValue(this.fullUserProfile.license);
			            this.labForm.controls['open'].setValue(this.fullUserProfile.avability.open?this.fullUserProfile.avability.open:'NA');
			            this.labForm.controls['close'].setValue(this.fullUserProfile.avability.close ? this.fullUserProfile.avability.close :'NA');
			          
		}

	    labFormInit(){
	      this.labForm = this.fb.group({
                 labId    :     new FormControl(''),
	      	       name          :     new FormControl('',Validators.required),
                 email         :     new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
                 license       :     new FormControl('',Validators.required),
                 contactNo     :     new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{6,15}$/)])),
                 city          :     new FormControl(''),
                 open          :     new FormControl('',Validators.required),
                 close         :     new FormControl('',Validators.required), 
                 image         :     new FormControl(''),
                 
               })
	    }

      updatePasswordFormInit(){
        this.updatePasswordForm = this.fb.group({
                 // adharId       :     new FormControl(''),
                 requestType   :     new FormControl(''),
                 oldPassword   :     new FormControl('',Validators.required),
                 password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
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

	  

	    updateUserProfile(value){
            const url = this.globalService.basePath+'lab/updateLabProfile';
            console.log(this.fullUserProfile);            
            console.log("JSON = = "+JSON.stringify(this.labForm.value));            
          	this.globalService.PostRequestUnautorized(url,this.labForm.value).subscribe((response) => { 
              if(response[0].json.status==200){          

                  this.fullUserProfile=response[0].json.data;                 
                  this.globalService.showNotification(response[0].json.message,2);                     
               } else{                 
                  this.globalService.showNotification(response[0].json.message,4);                     
               }
            });
          }

          updatePassword(){
            const url = this.globalService.basePath+'api/resetPassword';
             // this.updatePasswordForm.value.adharId="123123123234";
            this.updatePasswordForm.value.requestType="pharmacy";            
            this.globalService.PostRequestUnautorized(url,this.updatePasswordForm.value).subscribe((response) => { 
              if(response[0].json.status==200){            
                  this.fullUserProfile=response[0].json.data;                 
                  this.globalService.showNotification(response[0].json.responseMessage,2);                     
               } else{                 
                  this.globalService.showNotification(response[0].json.responseMessage,4);                     
               }
            });
          }

          pharmacySendRequestToAdmin(){
             console.log("value"+JSON.stringify(this.labForm.value))
          }

           minus(e){
             if (e.keyCode === 189 ) {return false;}
  }


          
}
