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
      if(localStorage.getItem('admin')){        
       this.user=JSON.parse(localStorage.getItem('admin')); 
       debugger
        if(this.user){
        this.userName=this.user.email;
        // this.userImage=this.user.image;
      }
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    } 
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
