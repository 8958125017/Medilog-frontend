import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
patients : any[] = [];
loading : boolean = false;
p: number = 1;
  constructor(public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,
    private http: Http) { 
     var status = this.globalService.isadminLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
  }

  ngOnInit() {
  	this.getDataByType();
  }

  deletePatient(patient){
    this.loading=true;
   let postData = {requestType : 'patient',mobileNo : patient.mobileNo};
   const url=this.globalService.basePath+'admin/deleteEntity';
   this.ng4LoadingSpinnerService.show();
   this.http.post(url,postData).subscribe((res)=>{
     this.ng4LoadingSpinnerService.hide();
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
   let postData = {requestType : 'patient'};
   const url=this.globalService.basePath+'admin/getDataByType';
   this.ng4LoadingSpinnerService.show();
   this.http.post(url,postData).subscribe((res)=>{
     this.ng4LoadingSpinnerService.hide();
      this.loading=false;
      if(res.json().status===200){
        this.patients = res.json().data;
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

}
