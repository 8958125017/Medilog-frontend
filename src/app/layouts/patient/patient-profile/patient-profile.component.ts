	import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
	import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
	import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
	import { Http, Headers, RequestOptions, Response  } from '@angular/http';
	import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
	import { GlobalServiceService}from'../../.././global-service.service';
	declare var $: any;
  import * as moment from 'moment';
  import { MessageService } from '../../.././message.service';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
user:any;
fullUserProfile:any;
private updateUserForm:FormGroup;
activityStatus:boolean=true;
billingsStatus:boolean=false;
editProfileStatus:boolean=false;
bloodgroup:any=[];
userImage:any;

  constructor(private http: Http,
	        private route: ActivatedRoute,
	        private router: Router,
	        private fb: FormBuilder,
	        public globalService:GlobalServiceService,private messgage : MessageService,
	        public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) {
  					this.user=JSON.parse(localStorage.getItem('patient'));
            var status = this.globalService.ispatientLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
	         }

           activity(){
             this.activityStatus=true;
             this.billingsStatus=false;
             this.editProfileStatus=false;
           }
           billings(){
             debugger
              this.activityStatus=false;
             this.billingsStatus=true;
             this.editProfileStatus=false;
           }
           editProfile(){
             debugger
             this.activityStatus=false;
             this.billingsStatus=false;
             this.editProfileStatus=true;
           } 

ngOnInit() {
 	  this.getUserProfile();
    this.updateUserFormInit();
    this.getBloodGroup();
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
           this.fullUserProfile=response[0].json.data;  
                          let userName=this.fullUserProfile.firstName+" " +this.fullUserProfile.lastName;
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

updateUserFormInit(){
        this.updateUserForm = this.fb.group({
          patientId : new FormControl(''),
          firstName : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
          lastName : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
          email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
          gender : new FormControl('',Validators.required),
          mobileNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{10,10}$/)])),
          city : new FormControl('',Validators.required),
          // department : new FormControl('',Validators.required),
          // designation : new FormControl(''),
          // description: new FormControl(''),
          // address : new  FormControl('',Validators.required),
          dob : new FormControl('',Validators.required),
          // degree : new FormControl('',Validators.required),
          age : new FormControl(''),
          // practiceSpecialties : new FormControl(''),         
          bloodgroup : new FormControl(''),
           image : new FormControl(''),
          // aadharNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^((?!(0))[0-9]{12,12})$/)])),
          });
      }


fillUserProfile(){
  debugger
    var b = moment(this.fullUserProfile.dob).format('YYYY-MM-DD');
    this.updateUserForm.controls['patientId'].setValue(this.fullUserProfile._id);
  	this.updateUserForm.controls['firstName'].setValue(this.fullUserProfile.firstName);
  	this.updateUserForm.controls['lastName'].setValue(this.fullUserProfile.lastName);
    this.updateUserForm.controls['mobileNo'].setValue(this.fullUserProfile.mobileNo);
  	this.updateUserForm.controls['email'].setValue(this.fullUserProfile.email);
  	this.updateUserForm.controls['gender'].setValue(this.fullUserProfile.gender);
  	this.updateUserForm.controls['age'].setValue(this.fullUserProfile.age);
  	this.updateUserForm.controls['city'].setValue(this.fullUserProfile.city);
  	this.updateUserForm.controls['bloodgroup'].setValue(this.fullUserProfile.bloodgroup);
  	this.updateUserForm.controls['dob'].setValue(b);
    this.updateUserForm.controls['image'].setValue(this.fullUserProfile.image);
}

updateUserProfile(value){
  this.updateUserForm.value.image=this.userImage;
      const url = this.globalService.basePath+'patient/updatePatientProfile';
      console.log(this.fullUserProfile);
    	this.globalService.PostRequestUnautorized(url,this.updateUserForm.value).subscribe((response) => { 
             
        if(response[0].json.status==200){ 

            this.getUserProfile(); 
            this.globalService.showNotification(response[0].json.message,2);                     
         } else{                 
            this.globalService.showNotification(response[0].json.message,4);                     
         }
      });
  }

   minus(e){
          if (e.keyCode === 189 ) {return false;}
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
