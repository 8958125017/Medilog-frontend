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
private pharmacyForm:FormGroup;
	

  constructor(private http: Http,
	            private route: ActivatedRoute,
	            private router: Router,
	            private fb: FormBuilder,
	            public globalService:GlobalServiceService,
	            public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) {
  	debugger
  	            this.user=JSON.parse(localStorage.getItem('pharmacy'));
                 var status = this.globalService.ispharmacyLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
	         }

 ngOnInit() {
	  	
	    this.updatePasswordFormInit();
	  }

	    

		

      updatePasswordFormInit(){
        this.pharmacyForm = this.fb.group({
                 email       :     new FormControl(''),
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
            const url = this.globalService.basePath+'api/resetPassword';
             this.pharmacyForm.value.email=this.user.email;
             this.pharmacyForm.value.requestType="pharmacy";            
            this.globalService.PostRequestUnautorized(url,this.pharmacyForm.value).subscribe((response) => { 
              if(response[0].json.status==200){            
                 
                  this.globalService.showNotification(response[0].json.responseMessage,2);                     
               } else{                 
                  this.globalService.showNotification(response[0].json.responseMessage,4);                     
               }
            });
          }
          reset(){
          	 this.pharmacyForm.reset();
          }
         
           minus(e){
             if (e.keyCode === 189 ) {return false;}
  }


          
}
