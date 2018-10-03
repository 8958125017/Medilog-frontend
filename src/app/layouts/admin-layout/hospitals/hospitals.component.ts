import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {
hospitals : any[] = [];
loading : boolean = false;

  constructor(public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,
    private http: Http) { 
       var status = this.globalService.isadminLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
  }

  ngOnInit() {
  	this.getDataByType();
  }

  deleteHospital(patient){
    this.loading=true;
   let postData = {requestType : 'hospital',mobileNo : patient.mobileNo};
   const url=this.globalService.basePath+'admin/deleteEntity';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.globalService.showNotification(res.json().message,2);
        this.getDataByType();
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

  getDataByType(){
   this.loading=true;
   let postData = {requestType : 'hospital'};
   const url=this.globalService.basePath+'admin/getDataByType';
   this.http.post(url,postData).subscribe((res)=>{
     debugger
      this.loading=false;
      if(res.json().status===200){
        this.hospitals = res.json().data;
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }


}
