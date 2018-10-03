import { Component, OnInit,NgModule, ElementRef } from '@angular/core';

import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $: any;

@Component({
  selector: 'app-viewdoctors',
  templateUrl: './viewdoctors.component.html',
  styleUrls: ['./viewdoctors.component.scss']
})
export class ViewdoctorsComponent implements OnInit {
doctors:any=[];
loading:boolean=false;
user:any;
   constructor(public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,
    public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,
    private http: Http) { 
      var status = this.globalService.ishospitalLogedIn();
           if(status==false){
            this.router.navigateByUrl('/login');
           }
   }

  ngOnInit() {
  	  var data = localStorage.getItem('hospital');
      if(data){
      	this.user = JSON.parse(data);
      } 
   this.getAllDoctors();
  }

  getAllDoctors(){
  	 debugger
  this.loading=true;
  this.ng4LoadingSpinnerService.show();  
  let patientId = this.user._id;
  const url=this.globalService.basePath+'doctor/getAllPatient';
 
  this.http.post(url,{patientId :patientId,multichainAddress : this.user.multichainAddress,stream :"doctor"}).subscribe((res)=>{
  	debugger
     this.loading=false;
     if(res.json().status===200){
         this.doctors = res.json().data;
         this.ng4LoadingSpinnerService.hide();  
       // this.globalService.showNotification(res.json().message,2);
     }else{
       this.globalService.showNotification(res.json().message,4);
     }
   });
 }

}
