import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalServiceService}from'../../global-service.service';
import { MessageService } from '../../message.service';
import { Subscription } from 'rxjs/Subscription';
declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type? : string;
    collapse? : string;
    children? : ChildrenItems[];
}

declare interface ChildrenItems {
    path: string;
    title: string;
    icon: string;
    class: string;
    type? : string;
}


export const LABSROUTES : RouteInfo[]=[
   { path: 'dashboard', title: 'Dashboard',type:'link',  icon:'dashboard', class: '' },
  { path: 'uploadbill', title: 'Upload Bill',type:'link',  icon:'person', class: '' },
  { path: 'uploadreport', title: 'Upload Report',type:'link',  icon:'person', class: '' },
  { path: 'profile', title: 'Profile',type:'link',  icon:'person', class: '' },
  {  path:'updatepassword',title:'Update Password',icon:'person', class: '',type: 'link'},
]



@Component({
  selector: 'app-labsidebar',
  templateUrl: './labsidebar.component.html',
  styleUrls: ['./labsidebar.component.css']
})

export class LabSidebarComponent implements OnInit {
  menuItems: any[];
  user:any;
  userName:any;
  userImage:any;
  subscription :Subscription;
  constructor(private messageservice:MessageService,location: Location,public globalService:GlobalServiceService, private element: ElementRef, private router: Router) { }


  ngOnInit() {  
     this.subscription=this.messageservice.getMessage().subscribe(message=>{
       if(message.text!="undefined" || message.image!="undefined") {
                       this.userName = message.text;
                       this.userImage=message.image;
                     }
     }) 
     if(localStorage.getItem('labs')){
      this.user=JSON.parse(localStorage.getItem('labs')); 
      if(this.user){
        this.userName=this.user.name;
        this.userImage=this.user.image;
      }
         this.menuItems = LABSROUTES.filter(menuItem => menuItem);
    } 
   
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };


  logout(){
    localStorage.clear();
            this.router.navigateByUrl('/login');
  }

}
