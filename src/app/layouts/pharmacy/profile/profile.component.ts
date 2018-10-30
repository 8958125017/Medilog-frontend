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
editProfile:boolean=true;
profileInfo:boolean=false;
pharmacys:any=[];
private pharmacyForm:FormGroup;
private updatePasswordForm:FormGroup;
viewProfile:boolean=true;
updateProfile:boolean=false;
private userImage:any;

  constructor(private http: Http,
	            private route: ActivatedRoute,
	            private router: Router,
	            private fb: FormBuilder,private messgage : MessageService,
	            public globalService:GlobalServiceService,
	            public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) {
  			      this.fullUserProfile=JSON.parse(localStorage.getItem('pharmacy'));
              var status = this.globalService.ispharmacyLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
	         }

 ngOnInit() {
	  	// this.getUserProfile();
	  	this.pharmacyFormInit();
       this.updatePasswordFormInit();
	  }

	     getUserProfile(){
	              const url = this.globalService.basePath+'pharmacy/viewPharmacyProfile';
                let data ={pharmacyid:this.fullUserProfile._id}
                debugger
                this.globalService.PostRequestUnautorized(url,data)
              .subscribe((response) => { 
                debugger
              	if(response[0].json.status==200){  
                       localStorage.setItem('pharmacy',JSON.stringify(response[0].json.data));
                       this.fullUserProfile=JSON.parse(localStorage.getItem('pharmacy'));                      
                       let userName=this.fullUserProfile.name;
                       let userImage=this.fullUserProfile.image;
                       this.messgage.sendMessage(userImage,userName);                       
                       this.fillUserProfile();  
                  // this.ng4LoadingSpinnerService.hide();
                   } else{
                      // this.ng4LoadingSpinnerService.hide();
                      this.globalService.showNotification(response[0].json.message,4);                     
                   }
                })
	          }

		fillUserProfile(){
                  this.pharmacyForm.controls['pharmacyId'].setValue(this.fullUserProfile._id ? this.fullUserProfile._id : 'NA');
			            this.pharmacyForm.controls['image'].setValue(this.fullUserProfile.image);
			            this.pharmacyForm.controls['name'].setValue(this.fullUserProfile.name ? this.fullUserProfile.name : 'NA');
			            this.pharmacyForm.controls['contactNo'].setValue(this.fullUserProfile.contactNo ? this.fullUserProfile.contactNo : 'NA');
			            this.pharmacyForm.controls['email'].setValue(this.fullUserProfile.email ? this.fullUserProfile.email : 'NA');
			            this.pharmacyForm.controls['city'].setValue(this.fullUserProfile.city ? this.fullUserProfile.city : 'NA');
			            this.pharmacyForm.controls['license'].setValue(this.fullUserProfile.license ? this.fullUserProfile.license : 'NA');
			            this.pharmacyForm.controls['open'].setValue(this.fullUserProfile.avaliablity.open ? this.fullUserProfile.avaliablity.open : 'NA');
			            this.pharmacyForm.controls['close'].setValue(this.fullUserProfile.avaliablity.close ? this.fullUserProfile.avaliablity.close : 'NA');
                  this.pharmacyForm.controls['address'].setValue(this.fullUserProfile.address ? this.fullUserProfile.address : 'NA');
                  this.pharmacyForm.controls['description'].setValue(this.fullUserProfile.description ? this.fullUserProfile.description : 'NA');
			          
		}

	    pharmacyFormInit(){
	      this.pharmacyForm = this.fb.group({
                 pharmacyId    :     new FormControl(''),
	      	       name          :     new FormControl('',Validators.required),
                 email         :     new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
                 license       :     new FormControl('',Validators.required),
                 contactNo     :     new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{6,15}$/)])),
                 city          :     new FormControl(''),
                 open          :     new FormControl('',Validators.required),
                 close         :     new FormControl('',Validators.required), 
                 image         :     new FormControl(''),
                 address       :     new FormControl(''),
                 description       :     new FormControl(''),
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
            const url = this.globalService.basePath+'pharmacy/updatePharmacyProfile';
            this.pharmacyForm.value.image=this.userImage;           
          	this.globalService.PostRequestUnautorized(url,this.pharmacyForm.value).subscribe((response) => { 
              debugger
              if(response[0].json.status==200){            
                  this.getUserProfile();                 
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
             console.log("value"+JSON.stringify(this.pharmacyForm.value))
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
                 this.userImage = e.target.result;
             }
            reader.readAsDataURL(file)
          }
}
