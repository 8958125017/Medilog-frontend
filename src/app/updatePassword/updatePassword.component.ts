import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { GlobalServiceService} from '../global-service.service';
declare var $: any;

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatePassword.component.html',
  styleUrls: ['./updatePassword.component.scss']
})
export class UpdatepasswordComponent implements OnInit {
user:any;
tokenId:any;
private updatePasswordForm:FormGroup;
  

  constructor(private http: Http,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              public globalService:GlobalServiceService,
              public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) {    
                // this.user=JSON.parse(localStorage.getItem('doctor'));
                //  var status = this.globalService.isdoctorLogedIn();
                // if(status==false){
                //  this.router.navigateByUrl('/login');
                // }
           }

 ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.tokenId = params["token"];            
          })
  
      this.updatePasswordFormInit();
    }

      updatePasswordFormInit(){
        this.updatePasswordForm = this.fb.group({
                 token       :     new FormControl(''),
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
             this.updatePasswordForm.value.token=this.tokenId.toString();
              const url = this.globalService.basePath+'api/updateForgotPassword';
              this.ng4LoadingSpinnerService.show();   
              debugger                         
            this.globalService.PostRequestUnautorized(url,this.updatePasswordForm.value).subscribe((response) => { 
              this.ng4LoadingSpinnerService.hide();
              debugger
              if(response[0].json.status==200){
                   this.router.navigate(['/login'])
                   this.updatePasswordForm.reset();
                  this.globalService.showNotification(response[0].json.message,2);                     
               } else{                 
                  this.globalService.showNotification(response[0].json.message,4);                     
               }
            });
          }

          reset(){
             this.updatePasswordForm.reset();
          }
         
           minus(e){
             if (e.keyCode === 189 ) {return false;}
  }


          
}
