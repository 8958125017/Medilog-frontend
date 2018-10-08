import { Component, OnInit,NgModule, ElementRef } from '@angular/core';

import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $: any;


@Component({
  selector: 'app-viewlabs',
  templateUrl: './viewlabs.component.html',
  styleUrls: ['./viewlabs.component.scss']
})
export class ViewlabsComponent implements OnInit {
   labs:any=[];
   loading:boolean=false;
   user:any;
   labLength:any=0;
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
  	 this.user = JSON.parse(localStorage.getItem('hospital'));
      if( this.user){      	
        this.getAlllabs();
      } 
   
  }

  getAlllabs(){     
  this.loading=true;
  let labId = this.user._id;
  const url=this.globalService.basePath+'doctor/getAllPatient';
    this.ng4LoadingSpinnerService.show();
  this.http.post(url,{patientId :labId,multichainAddress : this.user.multichainAddress,stream :"lab"}).subscribe((res)=>{
      this.ng4LoadingSpinnerService.hide();
     this.loading=false;
     debugger
     if(res.json().status===200){
       var result=res.json().data;
       if(result){
           this.labs = res.json().data;
           this.labLength=this.labs.length;
       }else{
         this.labLength=0;
       }
        
         
       // this.globalService.showNotification(res.json().message,2);
     }else{
       this.labLength=0;
       this.globalService.showNotification(res.json().message,4);
     }
   });
 }

}
