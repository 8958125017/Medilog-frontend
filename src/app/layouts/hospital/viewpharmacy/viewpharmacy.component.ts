


import { Component, OnInit,NgModule, ElementRef } from '@angular/core';

import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $: any;


@Component({
  selector: 'app-viewpharmacy',
  templateUrl: './viewpharmacy.component.html',
  styleUrls: ['./viewpharmacy.component.scss']
})
export class ViewpharmacyComponent implements OnInit {
pharmacys:any=[];
loading:boolean=false;
user:any;
pharmacyLength:any;
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
   this.getAllpharmacy();
  }

  getAllpharmacy(){
     debugger
  this.loading=true;
  let patientId = this.user._id;
  const url=this.globalService.basePath+'doctor/getAllPatient';
 this.ng4LoadingSpinnerService.show();  
  this.http.post(url,{patientId :patientId,multichainAddress : this.user.multichainAddress,stream :"pharmacy"}).subscribe((res)=>{
    this.ng4LoadingSpinnerService.hide();  
     this.loading=false;
     if(res.json().status===200){
       debugger
       var result=res.json().data;
       if(result.longth){
         this.pharmacys = res.json().data;
         this.pharmacyLength=this.pharmacys.length;
         
       }else{
           this.pharmacyLength=0;
       // this.globalService.showNotification(res.json().message,2);
       }
     }else{
       this.pharmacyLength=0;
       this.globalService.showNotification(res.json().message,4);
     }
   });
 }

}
