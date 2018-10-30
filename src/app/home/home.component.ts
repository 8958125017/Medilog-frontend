import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import {GlobalServiceService}from'../global-service.service';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
declare var $: any;
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
isLogin:boolean=false;
isNotLogin:boolean=true;
user:any;
contactForm: FormGroup;
  subscribeForm: FormGroup;
  contactDetail :any= {
            email:'',
            name: '',
            subject:'',
            message: ''
           }
           year:any;
  constructor(private router: Router, public globalService:GlobalServiceService,
        public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,private fb: FormBuilder) {
       this.year=moment(new Date()).format('YYYY');
         }

    ngOnInit() {
    this.user = localStorage.getItem('admin');
    this.user=JSON.parse(localStorage.getItem('admin')); 
       if(localStorage.getItem('admin')) {      
             this.isLogin=true;
             this.isNotLogin=false;
      }else if(localStorage.getItem('patient')){
             this.isLogin=true;
             this.isNotLogin=false;
      }else if(localStorage.getItem('hospital')){
      	     this.isLogin=true;
             this.isNotLogin=false;
      }else if(localStorage.getItem('labs')){
      	     this.isLogin=true;
             this.isNotLogin=false;
      }else if(localStorage.getItem('pharmacy')){
      	     this.isLogin=true;
             this.isNotLogin=false;
      }else if(localStorage.getItem('doctor')){
             this.isLogin=true;
             this.isNotLogin=false;
      }
      
     
   this.contactFormInit();
        this.subscribeFormInit();
  }

   contactFormInit(){
      this.contactForm = this.fb.group({
            'name': new FormControl('', Validators.required),
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$/)])),
            'message': new FormControl('', Validators.required),
            'subject': new FormControl('', Validators.required),           
            });
    }
    subscribeFormInit(){
      this.subscribeForm = this.fb.group({
            'email': new  FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$/)])),
        });
    }

    sendMessage(){    
          $('#contactUsModal').modal('hide');
         const url = this.globalService.basePath + 'api/contactUs';
         
         this.ng4LoadingSpinnerService.show();  
         this.globalService.PostRequestUnautorized(url , this.contactForm.value)
         .subscribe((response) => {           
           this.ng4LoadingSpinnerService.hide(); 
           debugger 
          if(response[0].json.status==200){
                this.contactForm.reset();
              this.globalService.showNotification(response[0].json.message,2,);   
             }else{
              this.contactForm.reset();
               this.globalService.showNotification(response[0].json.message,4,);   
          }
        })
     }
     subscribe(){
         const url = this.globalService.basePath + 'api/subscribeUs';
         this.globalService.PostRequestUnautorized(url , this.subscribeForm.value)
         .subscribe((response) => {
          if(response[0].json.status==200){
              this.subscribeForm.reset();
               this.globalService.showNotification(response[0].json.message,2,);  

             }else{
               this.subscribeForm.reset();
                this.contactForm.reset();
                 this.globalService.showNotification(response[0].json.message,4,);   
          }
        })
     }
  dashboard(){
  	  if(localStorage.getItem('admin')) {      
            this.router.navigate(['/admin/dashboard']);
      }else if(localStorage.getItem('patient')){
            this.router.navigate(['/patient/dashboard']);
      }else if(localStorage.getItem('hospital')){
      	    this.router.navigate(['/hospital/dashboard']);
      }else if(localStorage.getItem('labs')){
      	     this.router.navigate(['/labs/dashboard']);
      }else if(localStorage.getItem('pharmacy')){
      	     this.router.navigate(['/pharmacy/dashboard']);
      }else if(localStorage.getItem('doctor')){
             this.router.navigate(['/doctor/dashboard']);
      }
  }

  logout(){
    localStorage.clear();
    this.isLogin=false;
    this.isNotLogin=true;
    var message="logout successfully"
    this.globalService.showNotification(message,2);
  }


    openModalForcontactUsModal(){
                          $('#contactUsModal').modal('show');
          }


}
