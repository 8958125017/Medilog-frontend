import { Component, OnInit } from '@angular/core';

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

export const ROUTES: RouteInfo[] = [
 { path: 'dashboard',title:'Dashboard',icon:'dashboard', class: '',type: 'link'},
 { path: 'patients', title: 'View Patients', icon:'accessible', class: '',type: 'link'},
 { path :'pendingpatient', title : 'Pending Patients Request',type:'link',icon : 'accessible',class:''},
 { path: 'hospitals', title: 'View Hospitals', icon:'group', class: '',type: 'link'},
 { path :'pendinghospitals', title : 'Pending Hospitals Request',type:'link',icon : 'group',class:''},
 { path: 'doctors', title: 'View Doctors', icon:'person', class: '',type: 'link'},
 { path :'pendingdoctors', title : 'Pending Doctors Request',type:'link',icon : 'person',class:''},
 // { path: 'profile', title: 'Profile',type:'link',  icon:'person', class: '' },
 { path: 'pendinglabs', title: 'Pending Labs', icon:'person', class: '',type: 'link'},
 { path: 'labs', title: 'View Labs', icon:'person', class: '',type: 'link'},

 { path: 'pharmacy', title: 'View Pharmacy', icon:'person', class: '',type: 'link'},
 { path :'pendingpharmacy', title : 'Pending Pharmacy Request',type:'link',icon : 'person',class:''},
 // { path: 'user-profile', title: 'User Profile',type:'link',  icon:'person', class: '' },

];

// Doctor Routing here----------------------------------
export const DOCTORROUTES: RouteInfo[] = [
    { path: 'viewpatients', title: 'View Patients', icon:'accessible', class: '',type: 'sub'},
    { path : 'addpatient', title : 'Add Patient',icon:'person', type : 'link',class : ''},
    { path : 'createprescription', title : 'Create Prescription',icon:'person', type : 'link',class : ''},
    { path: 'recordreview', title : 'Record Review',icon:'person', type : 'link',class : ''},
    { path: 'doctorrequest', title: 'Send Request', icon:'group', class: '',type: 'sub'},
    { path: 'profile', title: 'Profile',type:'link',  icon:'person', class: '' },
];

export const PATIENTSRROUTES : RouteInfo[]=[
     {  path:'dashboard',title:'Dashboard',icon:'dashboard', class: '',type: 'sub',collapse : 'patient',},
     {  path:'addoldrecord',title:'  AddOldRecord',icon:'accessible', class: '',type: 'sub',collapse : 'patient',},
     {  path:'history',title:'EHR History',icon:'accessible', class: '',type: 'sub',collapse : 'patient',},
     {  path:'healthAnalysis',title:'Health Analysis',icon:'accessible', class: '',type: 'sub',collapse : 'patient',},
     {  path:'connectDevice',title:'Connect Device',icon:'accessible', class: '',type: 'sub',collapse : 'patient',},
     { path: 'profile', title: 'Profile',type:'link',  icon:'person', class: '' },
];

export const HOSPITALROUTES : RouteInfo[]=[
  { path: 'profile', title: 'Profile',type:'link',  icon:'person', class: '' },
     {  path:'dashboard',title:'Dashboard',icon:'dashboard', class: '',type: 'link'},
     {  path:'adddoctor',title:'Add Doctor',icon:'person', class: '',type: 'link'},
     {  path:'addpharmacy',title:'Add Pharmacy',icon:'person', class: '',type: 'link'},
     {  path:'addlabs',title:'Add Labs',icon:'person', class: '',type: 'link'},

]

export const LABSROUTES : RouteInfo[]=[
//  {  path:'dashboard',title:'Dashboard',icon:'dashboard', class: '',type: 'link'},
  { path: 'uploadbill', title: 'Upload Bill',type:'link',  icon:'person', class: '' },
  { path: 'uploadreport', title: 'Upload Report',type:'link',  icon:'person', class: '' },
  { path: 'profile', title: 'Profile',type:'link',  icon:'person', class: '' },
]

export const PHARMACYROUTES : RouteInfo[]=[
  {  path:'dashboard',title:'Dashboard',icon:'dashboard', class: '',type: 'link'},
  { path: 'profile', title: 'Profile',type:'link',  icon:'person', class: '' },
  { path: 'uploadbill', title: 'Upload Bill',type:'link',  icon:'person', class: '' },
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  user : any;
  userName:any;
  userImage:any;
  constructor() { }

  ngOnInit() {
    this.user = localStorage.getItem('admin');
    this.user=JSON.parse(localStorage.getItem('admin')); 
    if(this.user) {
      
        this.userName=this.user.email;
      //  this.userImage=this.user.image;
        this.menuItems = ROUTES.filter(menuItem => menuItem);
      }
      
     
    this.user = localStorage.getItem('patient');

    if(this.user) this.menuItems = PATIENTSRROUTES.filter(menuItem => menuItem);

    this.user = localStorage.getItem('hospital');
    if(this.user) this.menuItems = HOSPITALROUTES.filter(menuItem => menuItem);

    this.user = localStorage.getItem('labs');
    if(this.user) this.menuItems = LABSROUTES.filter(menuItem => menuItem);
    
    this.user = localStorage.getItem('pharmacy');
    if(this.user) this.menuItems = PHARMACYROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
