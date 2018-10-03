import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import {GlobalServiceService}from'../../global-service.service';
declare const $: any;
import { MessageService } from '../../message.service';
import { Subscription } from 'rxjs/Subscription';
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

export const PATIENTSRROUTES : RouteInfo[]=[
     {  path:'dashboard',title:'Dashboard',icon:'dashboard', class: '',type: 'sub',collapse : 'patient',},
     {  path:'ehr',title:'EHR',icon:'accessible', class: '',type: 'sub',collapse : 'patient',},
     //{  path:'connectDevice',title:'Connect Device',icon:'accessible', class: '',type: 'sub',collapse : 'patient',},
     {  path:'patientProfile',title:'Patient Profile',icon:'accessible', class: '',type: 'sub',collapse : 'patient',},
     //{  path:'healthAnalysis',title:'Health Analysis',icon:'accessible', class: '',type: 'sub',collapse : 'patient'},
     //{  path:'discoverInsurence',title:'Discover Insurence',icon:'accessible', class: '',type: 'sub',collapse : 'patient'},
     {  path:'searchdoctors',title:'Search Doctors',icon:'accessible', class: '',type: 'sub',collapse : 'patient',},
     {  path:'updatepassword',title:'Update Password',icon:'accessible', class: '',type: 'sub',collapse : 'patient',},

];




@Component({
  selector: 'app-patientsidebar',
  templateUrl: './patientsidebar.component.html',
  styleUrls: ['./patientsidebar.component.css']
})
export class PatientSidebarComponent implements OnInit {
  menuItems: any[];
  user : any;
  userName:any;
   userImage:any;
    subscription: Subscription;
  constructor(private message : MessageService,location: Location,public globalService:GlobalServiceService, private element: ElementRef, private router: Router) { }

  ngOnInit() {
    this.subscription = this.message.getMessage().subscribe(message => { 
                     if(message.text!="undefined" || message.image!="undefined") {
                       this.userName = message.text;
                       this.userImage=message.image;
                     }
                   });
      if(localStorage.getItem('patient')){        
       this.user=JSON.parse(localStorage.getItem('patient')); 
        if(this.user){
        this.userName=this.user.firstName+" "+this.user.lastName;
        this.userImage=this.user.image;
      }
      this.menuItems = PATIENTSRROUTES.filter(menuItem => menuItem);
    } 

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  
    logout(){
      this.globalService.logout();
    }
}
