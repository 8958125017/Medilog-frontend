

import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from  '@angular/router';
import { GlobalService } from '../global.service';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $:any;
import * as moment from 'moment';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

    forgotPsswordForm: FormGroup;
    loading: boolean= false;   
    public user;   
    year:any;
    forgotPasswordDetail : any={
                            email:''
                       };
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    constructor(
                public fb: FormBuilder, 
                public globalService: GlobalService,
                private element: ElementRef,
                public router: Router ,
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
     ) {
      localStorage.clear();
       this.year=moment(new Date()).format('YYYY');
      
     }

    ngOnInit() {
     this.formInitialization();
             
    }

    formInitialization(){
     this.forgotPsswordForm = this.fb.group({     
         'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{3,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
     })
    }

    forgotPassword(){
       this.loading=true;
           const url = this.globalService.basepath + 'api/forgotpassword';
          this.globalService.postRequestUnathorised(url , this.forgotPasswordDetail)
        .subscribe((response) => {
        	this.loading=false;
        	    if(response[0].json.status==200){                     
                   this.forgotPsswordForm.reset();
                   this.globalService.showNotification('top','right',2,response[0].json.msg); 
              }else{               
                  this.forgotPsswordForm.reset();
                  this.globalService.showNotification('top','right',4,response[0].json.msg);
              }                     
     
          });
    
       
     
    }

    gotoForgotPassword(){
      this.router.navigateByUrl('forgot-password');
    }

}

