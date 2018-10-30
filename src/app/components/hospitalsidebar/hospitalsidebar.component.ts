

import { Component, OnInit, ElementRef } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import {GlobalServiceService}from'../../global-service.service';
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


export const HOSPITALROUTES : RouteInfo[]=[
     {  path:'dashboard',title:'Dashboard',icon:'dashboard', class: '',type: 'link'},
     { path: 'viewpatients', title: 'Patient', icon:'accessible', class: '',type: 'sub'},
     {  path:'viewdoctor',title:'Doctor',icon:'person', class: '',type: 'link'},
     {  path:'viewpharmacy',title:'Pharmacy',icon:'person', class: '',type: 'link'},
     {  path:'viewdiagnostic',title:'Diagnostic',icon:'person', class: '',type: 'link'},
     {  path:'profile',title:'Profile',icon:'person', class: '',type: 'link'},
     {  path:'updatepassword',title:'Update Password',icon:'person', class: '',type: 'link'},
]


@Component({
  selector: 'app-hospitalsidebar',
  templateUrl: './hospitalsidebar.component.html',
  styleUrls: ['./hospitalsidebar.component.css']
})

export class HospitalSidebarComponent implements OnInit {
  menuItems: any[];
  user:any;
  subscription: Subscription;
  userName:any;
  userImage:any;
  constructor(private message : MessageService,location: Location,public globalService:GlobalServiceService, private element: ElementRef, private router: Router) { }


  ngOnInit() { 
    this.subscription = this.message.getMessage().subscribe(message => { 
                     if(message.text!="undefined" || message.image!="undefined") {
                       this.userName = message.text;
                       this.userImage=message.image;
                     }
                   });  
    if(localStorage.getItem('hospital')){
      this.user=JSON.parse(localStorage.getItem('hospital')); 
      if(this.user){
        this.userName=this.user.name;
        this.userImage=this.user.image;
      }
         this.menuItems = HOSPITALROUTES.filter(menuItem => menuItem);
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
