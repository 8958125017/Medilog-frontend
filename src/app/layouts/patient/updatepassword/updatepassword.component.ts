import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { GlobalServiceService}from'../../.././global-service.service';
declare var $: any;

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss']
})
export class UpdatepasswordComponent implements OnInit {
user:any;
private patientForm:FormGroup;
	

  constructor(private http: Http,
	            private route: ActivatedRoute,
	            private router: Router,
	            private fb: FormBuilder,
	            public globalService:GlobalServiceService,
	            public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) {
  	          this.user=JSON.parse(localStorage.getItem('patient'));
              debugger
                var status = this.globalService.ispatientLogedIn();
                if(status==false){
                  this.router.navigateByUrl('/login');
                 }
	         }

   ngOnInit() {
	    this.updatePasswordFormInit();
	  }

	    
        updatePasswordFormInit(){
          this.patientForm = this.fb.group({
                   email         :     new FormControl(''),
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

	  

	   
          updatePassword(){
            const url = this.globalService.basePath + 'api/resetPassword';
             this.patientForm.value.email = this.user.email;
             this.patientForm.value.requestType = "patient";     
             this.ng4LoadingSpinnerService.show();       
            this.globalService.PostRequestUnautorized(url,this.patientForm.value).subscribe((response) => { 
              this.ng4LoadingSpinnerService.hide();  
              if(response[0].json.status==200){  
              this.patientForm.reset(); 
                  this.globalService.showNotification(response[0].json.message,2);                     
               } else{                 
                  this.globalService.showNotification(response[0].json.message,4);                     
               }
            });
          }

          reset(){
          	 this.patientForm.reset();
          }
         
           minus(e){
             if (e.keyCode === 189 ) {return false;}
  }


          
}
