import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {Http} from '@angular/http';
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
	signUpForm: FormGroup;

loading : boolean =false;
   constructor(
  	          public globalService:GlobalService,
  	          private router: Router,
  	          private fb: FormBuilder,
              private http: Http,
            	) {


                }



 signUp(){    
  this.loading=true;
   const url=this.globalService.basepath+'api/register';
     this.globalService.postRequestUnathorised(url,this.signUpForm.value).subscribe((res)=>{
       debugger
      this.loading=false;
       if(res[0].json.status === 200){
         this.signUpForm.reset();
         this.router.navigate(['/login']);
         this.globalService.showNotification('top','right',2,res[0].json.msg);         
       }else{
         this.globalService.showNotification('top','right',4,res[0].json.msg);
       }
     })
   }


  ngOnInit() {
  	this.signupFormInit();
  }



  signupFormInit(){
      this.signUpForm = this.fb.group({
            'name': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
            'password': new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
            'confirmpassword':new FormControl('', Validators.required),
            'mobileNumber': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        )])),

        }, { validator: this.matchingPasswords('password', 'confirmpassword') });
    }

    matchingPasswords(passwordKey: string, confirmpasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmpassword = group.controls[confirmpasswordKey];
            if (password.value !== confirmpassword.value) {
                return {
                    mismatchedpasswords: true
                };
            }
        }
    }
   

}
