import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
declare var $:any;
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../global.service';
import * as moment from 'moment';
@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss']
})

export class UpdatepasswordComponent implements OnInit {
  public user:any;
  public profileDetail:any;
  updatePassword: any= { 
                   newPassword: '',
                   confirmNewPassword:''            
           };

    updatePasswordForm: FormGroup;
    test: Date = new Date();
    
    tokenId:any;
    private nativeElement: Node;
    year:any;
    loading:boolean=false;
    constructor(
                private http: Http,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,          
                private element: ElementRef,               
                private activatedRoute: ActivatedRoute,
                private globalService:GlobalService
      ) {     
          this.user=JSON.parse(localStorage.getItem('currentUser')); 
           this.year=moment(new Date()).format('YYYY');
        }

   
    updateUserPassword(){
     this.loading=true;
      let postData ={
                    token:this.tokenId,
                    newPassword: this.updatePassword.newPassword
          };
         const url = this.globalService.basepath + 'api/resetpassword';
         this.globalService.PostRequest(url , postData).subscribe(response=>{ 
          this.loading=false;
            this.updatePasswordForm.reset();
            if(response[0].json.status == 200){ 
               this.router.navigateByUrl('/login');
                  this.globalService.showNotification('top','right',2,response[0].json.json().msg);  
            }else{ 
                this.globalService.showNotification('top','right',4,response[0].json.json().msg);   
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