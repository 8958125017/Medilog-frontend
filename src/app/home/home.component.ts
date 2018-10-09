import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import {GlobalServiceService}from'../global-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
isLogin:boolean=false;
isNotLogin:boolean=true;
user:any;
  constructor(private router: Router, public globalService:GlobalServiceService,
        public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) { }

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
             this.router.navigate(['/doctor/viewpatients']);
      }
  }

  logout(){
    localStorage.clear();
    this.isLogin=false;
    this.isNotLogin=true;
    var message="logout successfully"
    this.globalService.showNotification(message,2);
  }

}
