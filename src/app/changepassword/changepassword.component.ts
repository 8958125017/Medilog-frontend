
import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
  declare var $:any;
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import {GlobalServiceService}from'../global-service.service';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import * as moment from 'moment';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})

export class ChangepasswordComponent implements OnInit {
  public user:any;
   public profileDetail:any;
  updatePassword = { 
            //currentPassword: '',
            newPassword: '',
            confirmNewPassword:''            
           }

  updatePasswordForm: FormGroup;
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    tokenId:any;
    private nativeElement: Node;
    year:any;
    constructor(
                private http: Http,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,          
                private element: ElementRef,               
                 private activatedRoute: ActivatedRoute,
                private global_service:GlobalServiceService,
                 private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
      ) {     
          this.user=JSON.parse(localStorage.getItem('currentUser'));  
        }

   
    updateUserPassword(){
      this.ng4LoadingSpinnerService.show();    
      let postData ={
          token:this.tokenId,
          newPassword: this.updatePassword.newPassword
       };
         const url = this.global_service.basePath + 'api/reset_password';
         this.global_service.PostRequest(url , postData).subscribe(response=>{ 
           this.ng4LoadingSpinnerService.hide();           
           this.updatePasswordForm.reset();
            if(response[0].json.status == 200){ 
               this.router.navigateByUrl('/login');
             this.global_service.showNotification(response[0].json.json().message,2);
            }else{
              this.ng4LoadingSpinnerService.hide(); 
               this.updatePasswordForm.reset();
               this.global_service.showNotification(response[0].json.json().message,4);
            }
          })
    }
  ngOnInit() {
       
       this.activatedRoute.params.subscribe(params => {
            this.tokenId = params["token"];
          })
  
        this.loginFormInit();

       
    }

    loginFormInit(){
      this.updatePasswordForm = this.fb.group({ 
            'newPassword':  new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(100),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
            'confirmNewPassword': new FormControl('', Validators.required)            
           }, { validator: this.matchingPasswords('newPassword', 'confirmNewPassword') });
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {       
        return (group: FormGroup): { [key: string]: any } => {
            let newPassword = group.controls[passwordKey];
            let confirmNewPassword = group.controls[confirmPasswordKey];
            if (newPassword.value !== confirmNewPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }
  }
