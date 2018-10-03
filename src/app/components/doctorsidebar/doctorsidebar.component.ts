import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
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


// Doctor Routing here----------------------------------
export const DOCTORROUTES: RouteInfo[] = [
    { path: 'viewpatients', title: 'View Patients', icon:'accessible', class: '',type: 'sub'},
    //{ path : 'addpatient', title : 'Add Patient',icon:'person', type : 'link',class : ''},
    // { path : 'createprescription', title : 'Create Prescription',icon:'person', type : 'link',class : ''},
    // { path: 'recordreview', title : 'Record Review',icon:'person', type : 'link',class : ''},
    //{ path: 'doctorrequest', title: 'Send Request', icon:'group', class: '',type: 'sub'},
    { path: 'profile', title: 'Profile',type:'link',  icon:'person', class: '' },
    { path: 'updatepassword', title: 'Update Password',type:'link',  icon:'person', class: '' },
];





@Component({
  selector: 'app-doctorsidebar',
  templateUrl: './doctorsidebar.component.html',
  styleUrls: ['./doctorsidebar.component.css']
})

export class DoctorSidebarComponent implements OnInit {
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
    if(localStorage.getItem('doctor')){    
      this.user=JSON.parse(localStorage.getItem('doctor')); 
      if(this.user){
        this.userName=this.user.firstName+" "+this.user.lastName;
        this.userImage=this.user.image;
      }
      this.menuItems = DOCTORROUTES.filter(menuItem => menuItem);
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
