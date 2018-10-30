import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { GlobalServiceService}from'../../.././global-service.service';
declare var $: any;
  import { MessageService } from '../../.././message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user:any;
fullUserProfile:any;
viewProfile:boolean=true;
updateProfile:boolean=false;
private labForm:FormGroup;
private updatePasswordForm:FormGroup;
private userImage:any;

  constructor(private http: Http,
	            private route: ActivatedRoute,
	            private router: Router,
	            private fb: FormBuilder,private messgage : MessageService,
	            public globalService:GlobalServiceService,
	            public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) {
  			      this.fullUserProfile=JSON.parse(localStorage.getItem('labs'));
              debugger
                var status = this.globalService.islabsLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
	         }

 ngOnInit() {	 
      // this.getUserProfile(); 
	  	this.labFormInit();
      this.updatePasswordFormInit();
	  }

	     getUserProfile(){
	              const url = this.globalService.basePath+'lab/viewLabProfile';
                let data ={labid:this.fullUserProfile._id}
                this.globalService.PostRequestUnautorized(url,data)
              .subscribe((response) => { 
                debugger
              	if(response[0].json.status==200){  
                        localStorage.setItem('labs',JSON.stringify(response[0].json.data));
                        this.fullUserProfile=JSON.parse(localStorage.getItem('labs'));                      
                          let userName=this.fullUserProfile.name;
                          let userImage=this.fullUserProfile.image;
                          this.messgage.sendMessage(userImage,userName);                       
                          this.fillUserProfile();	
                      } else{
                       this.globalService.showNotification(response[0].json.message,4);                     
                   }
                })
	          }

		fillUserProfile(){
                  this.labForm.controls['labId'].setValue(this.fullUserProfile._id?this.fullUserProfile._id:'NA');
			            this.labForm.controls['image'].setValue(this.fullUserProfile.image);
			            this.labForm.controls['name' ].setValue(this.fullUserProfile.name);
			            this.labForm.controls['contactNo'].setValue(this.fullUserProfile.contactNo);
			            this.labForm.controls['email'].setValue(this.fullUserProfile.email);
			            this.labForm.controls['city'].setValue(this.fullUserProfile.city);
                  this.labForm.controls['description'].setValue(this.fullUserProfile.description);
			            this.labForm.controls['license'].setValue(this.fullUserProfile.license);
                  this.labForm.controls['address'].setValue(this.fullUserProfile.address);
			            this.labForm.controls['open'].setValue(this.fullUserProfile.avaliablity.open?this.fullUserProfile.avaliablity.open:'NA');
			            this.labForm.controls['close'].setValue(this.fullUserProfile.avaliablity.close ? this.fullUserProfile.avaliablity.close :'NA');
			            
		}

	    labFormInit(){
	      this.labForm = this.fb.group({
                 labId    :     new FormControl(''),
	      	       name          :     new FormControl('',Validators.required),
                 email         :     new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
                 license       :     new FormControl('',Validators.required),
                 contactNo     :     new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{6,15}$/)])),
                 city          :     new FormControl(''),
                 address       :     new FormControl(''),
                 description   :     new FormControl(''),
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
            this.labForm.value.image=this.userImage;         
          	this.globalService.PostRequestUnautorized(url,this.labForm.value).subscribe((response) => { 
              debugger
              if(response[0].json.status==200){         
                   this.getUserProfile();
                 // this.fullUserProfile=response[0].json.data;                 
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

           tab1(){
             this.viewProfile=true;
             this.updateProfile=false;
          }
          tab2(){
            this.viewProfile=false;
            this.updateProfile=true;
              this.getUserProfile();
          }
          
          uploadImage(event){
             let reader = new FileReader();
             let file = event.target.files[0];
             reader.onloadend = (e:any) => {
               debugger
                 this.userImage = e.target.result;
               
               
             }
      reader.readAsDataURL(file)
   }

          
}
