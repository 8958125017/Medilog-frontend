import { Component, OnInit,NgModule } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import { GlobalService } from '../global.service';

declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  keysArray : any
  loading:boolean=false;
  userprofile:any={
                   name:'',
                   email:'',
                   mobileNumber:''
    }
    constructor(public http : Http,routes:Router,public globalService:GlobalService) {
     this.loading=true;
    }

  ngOnInit() {  
    var user = localStorage.getItem('currentUser');
    var userData = JSON.parse(user);
    const url=this.globalService.basepath+'api/getProfile';
    this.http.post(url,{userid:userData._id}).subscribe((res)=>{
      this.loading=false;
      if(res.status===200){
        this.userprofile.email=res.json().email;
        this.userprofile.name=res.json().name;
        this.userprofile.mobileNumber=res.json().mobileNumber;
      }else{
        this.globalService.showNotification('top','right',4,res.json().message);
        // alert(res.json().message);
      }
    });
  }

  updateProfile(){
    var user = localStorage.getItem('currentUser');
    var userData = JSON.parse(user);
    var obj = {
      updatemobile : this.userprofile.mobileNumber,
      userid:userData._id,
      updatename:this.userprofile.name
    };
    const url = this.globalService.basepath +'api/userupdate';
    this.loading=true;
    this.http.post(url,obj).subscribe((res)=>{
       this.loading=false;
      if(res.status===200){
        this.ngOnInit();
        this.globalService.showNotification('top','right',2,res.json().msg);
      }else{
        this.globalService.showNotification('top','right',4,res.json().msg);
       }
    });
  }

}
