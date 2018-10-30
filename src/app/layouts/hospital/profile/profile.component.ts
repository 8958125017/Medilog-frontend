	import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
	import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
	import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
	import { Http, Headers, RequestOptions, Response  } from '@angular/http';
	import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
	import { GlobalServiceService}from'../../.././global-service.service';
  import { MessageService } from '../../.././message.service';
	declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user:any;
fullUserProfile:any;
private hospitalForm:FormGroup;
private updatePasswordForm:FormGroup;
	viewProfile:boolean=true;
updateProfile:boolean=false;
userImage:any;
specialities:any=[];
  constructor(private http: Http,
	            private route: ActivatedRoute,
	            private router: Router,
	            private fb: FormBuilder,
	            public globalService:GlobalServiceService,
	            public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,private messgage : MessageService) {
  					     this.user=JSON.parse(localStorage.getItem('hospital'));
                var status = this.globalService.ishospitalLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
	         }

 ngOnInit() {
	  	  this.getUserProfile();
	  	  this.hospitalFormInit();
        this.updatePasswordFormInit();
        this.getSpecialities();
	  }

	     getUserProfile(){  
                const url = this.globalService.basePath+'api/viewProfile';
               let data ={
                          id:this.user._id, 
                          requestType :'hospital'
                        }
                         this.ng4LoadingSpinnerService.show();
                this.globalService.PostRequestUnautorized(url,data)
              .subscribe((response) => { 
                this.ng4LoadingSpinnerService.hide();
              	if(response[0].json.status==200){  
                        this.fullUserProfile=response[0].json.data;
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
      debugger
                  this.hospitalForm.controls['hospitalId'].setValue(this.fullUserProfile._id ? this.fullUserProfile._id : 'NA');
			            this.hospitalForm.controls['image'].setValue(this.fullUserProfile.image );
			            this.hospitalForm.controls['name'].setValue(this.fullUserProfile.name ? this.fullUserProfile.name : 'NA');
                  this.hospitalForm.controls['email'].setValue(this.fullUserProfile.email ? this.fullUserProfile.email : 'NA');
			            this.hospitalForm.controls['contactNo'].setValue(this.fullUserProfile.contactNo ? this.fullUserProfile.contactNo : 'NA');
			            this.hospitalForm.controls['address'].setValue(this.fullUserProfile.address ? this.fullUserProfile.address : 'NA');
			            this.hospitalForm.controls['city'].setValue(this.fullUserProfile.city ? this.fullUserProfile.city : 'NA');
			            this.hospitalForm.controls['location'].setValue(this.fullUserProfile.location ? this.fullUserProfile.location : 'NA');
			            this.hospitalForm.controls['open'].setValue(this.fullUserProfile.timming.open ? this.fullUserProfile.timming.open : 'NA');
			            this.hospitalForm.controls['close'].setValue(this.fullUserProfile.timming.close ? this.fullUserProfile.timming.close : 'NA');
			            this.hospitalForm.controls['practiceSpecialties'].setValue(this.fullUserProfile.practiceSpecialties ? this.fullUserProfile.practiceSpecialties : 'NA');
                  this.hospitalForm.controls['description'].setValue(this.fullUserProfile.description ? this.fullUserProfile.description : 'NA');
		}

	    hospitalFormInit(){
	      this.hospitalForm = this.fb.group({
                 hospitalId    :     new FormControl(''),
                 image         :     new FormControl(''),
	      	       name          :     new FormControl('',Validators.required),
                 email         :     new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
                 contactNo     :     new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{6,15}$/)])),
                 address : new  FormControl('',Validators.required),
                 city          :     new FormControl(''),                 
                 location      :     new FormControl(''),       
                 open          :     new FormControl('',Validators.required),
                 close         :     new FormControl('',Validators.required), 
                 practiceSpecialties     :     new FormControl('', Validators.required),                 
                 description   :     new FormControl('')
               })
	    }

      updatePasswordFormInit(){
        this.updatePasswordForm = this.fb.group({
                 adharId       :     new FormControl(''),
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

	  

	    updateHospitalProfile(value){
        this.hospitalForm.value.image=this.userImage;
            const url = this.globalService.basePath+'hospital/updateHospitalProfile';
            console.log(this.fullUserProfile);
            console.log("JSON = = "+JSON.stringify(this.hospitalForm.value));
            this.ng4LoadingSpinnerService.show();
          	this.globalService.PostRequest(url,this.hospitalForm.value).subscribe((response) => { 
               this.ng4LoadingSpinnerService.hide();
               var res=JSON.parse(response[0].json._body);
              if(res.status==200){            
                 // this.fullUserProfile=response[0].json.data; 
                   this.getUserProfile();   
                   debugger
                  this.globalService.showNotification(res.message,2);                     
               } else{                 
                  this.globalService.showNotification(res.message,4);                     
               }
            });
          }

          updatePassword(){
            const url = this.globalService.basePath+'api/resetPassword';
             this.updatePasswordForm.value.adharId="123123123234";
            this.updatePasswordForm.value.requestType="hospital";
            debugger
            this.globalService.PostRequest(url,this.updatePasswordForm.value).subscribe((response) => { 
              if(response[0].json.status==200){            
                  this.fullUserProfile=response[0].json.data;                 
                  this.globalService.showNotification(response[0].json.message,2);                     
               } else{                 
                  this.globalService.showNotification(response[0].json.message,4);                     
               }
            });
          }

          hospitalSendRequestToAdmin(){
             console.log("value"+JSON.stringify(this.hospitalForm.value))
          }

           minus(e){
             if (e.keyCode === 189 ) {return false;}
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

  tab1(){
             this.viewProfile=true;
             this.updateProfile=false;
          }
          tab2(){
            this.viewProfile=false;
            this.updateProfile=true;
          }
       

     getSpecialities(){
     const url=this.globalService.basePath+'doctor/gettypedoctor';
     this.globalService.PostRequestUnautorized(url).subscribe(response=>{
      if(response[0].json.status===200){
        debugger
         this.specialities=response[0].json.data;
      }else{
         this.globalService.showNotification(response.json().message,4);
      }
    });
  }
          
}
