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
private updateUserForm:FormGroup;

	

  constructor(private http: Http,
	        private route: ActivatedRoute,
	        private router: Router,
	        private fb: FormBuilder,
	        public globalService:GlobalServiceService,
	        public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) {
  					this.user=JSON.parse(localStorage.getItem('patient'));
  					var status = this.globalService.ispatientLogedIn();
		                if(status==false){
		                 this.router.navigateByUrl('/login');
		                }
	         }

 ngOnInit() {
	  	this.getUserProfile();
	  	this.updateUserFormInit();
	  }

	     getUserProfile(){
	       	let self = this;
                const url = this.globalService.basePath+'api/viewProfile';
                let data ={id:this.user._id, requestType :'patient'}
                  // this.ng4LoadingSpinnerService.show();
              this.globalService.PostRequestUnautorized(url,data)
              .subscribe((response) => { 
              	debugger;
                  if(response[0].json.status==200){            
                        self.fullUserProfile=response[0].json.data;	
                  // this.ng4LoadingSpinnerService.hide();
                   } else{
                      // this.ng4LoadingSpinnerService.hide();
                      this.globalService.showNotification(response[0].json.message,4);                     
                   }
                      })
	          }

fillUserProfile(){
	this.updateUserForm.controls['name'].setValue(this.fullUserProfile.firstName+' '+this.fullUserProfile.lastName);
	this.updateUserForm.controls['mobileNo'].setValue(this.fullUserProfile.mobileNo);
	this.updateUserForm.controls['email'].setValue(this.fullUserProfile.email);
	this.updateUserForm.controls['gender'].setValue(this.fullUserProfile.gender);
	this.updateUserForm.controls['age'].setValue(this.fullUserProfile.age);
	this.updateUserForm.controls['city'].setValue(this.fullUserProfile.city);
	this.updateUserForm.controls['bloodgroup'].setValue(this.fullUserProfile.bloodgroup);
	this.updateUserForm.controls['dob'].setValue(this.fullUserProfile.dob);
}

	    updateUserFormInit(){
	      this.updateUserForm = this.fb.group({
	      	  name : new FormControl('',Validators.required),
		      email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
		      gender : new FormControl('',Validators.required),
		      mobileNo : new FormControl('',Validators.required),
		      city : new FormControl('',Validators.required),
		      dob : new FormControl('',Validators.required),
		      age : new FormControl('',Validators.required),
		      // practiceSpecialty : new FormControl(''),
		      bloodgroup : new FormControl('',Validators.required),
		      // image : new FormControl(''),
	        });
	    }

	    updateUserProfile(value){
            const url = this.globalService.basePath+'api/userUpdate';
            console.log(this.fullUserProfile);
          	this.globalService.PostRequestUnautorized(url,this.updateUserForm.value).subscribe((response) => { 
              if(response[0].json.status==200){            
                  this.fullUserProfile=response[0].json.data;	
                  this.globalService.showNotification(response[0].json.responseMessage,2);                     
               } else{                 
                  this.globalService.showNotification(response[0].json.responseMessage,4);                     
               }
            });
          }
}
