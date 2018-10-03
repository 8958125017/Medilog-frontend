import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalServiceService}from'../../global-service.service';

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


export const PHARMACYROUTES : RouteInfo[]=[
 //  {  path:'dashboard',title:'Dashboard',icon:'dashboard', class: '',type: 'link'}, 
   { path: 'uploadbill', title: 'Upload Bill',type:'link',  icon:'person', class: '' },
   { path: 'profile', title: 'Profile',type:'link',  icon:'person', class: '' },
   { path: 'upatepassword', title: 'Upate Password',type:'link',  icon:'person', class: '' },
]



@Component({
  selector: 'app-pharmacysidebar',
  templateUrl: './pharmacysidebar.component.html',
  styleUrls: ['./pharmacysidebar.component.css']
})

export class PharmacySidebarComponent implements OnInit {
  menuItems: any[];
  user:any;
  userName:any;
  constructor(location: Location,public globalService:GlobalServiceService, private element: ElementRef, private router: Router) { }


  ngOnInit() {   
    if(localStorage.getItem('pharmacy')){
      this.user=JSON.parse(localStorage.getItem('pharmacy')); 
         this.menuItems = PHARMACYROUTES.filter(menuItem => menuItem);
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
