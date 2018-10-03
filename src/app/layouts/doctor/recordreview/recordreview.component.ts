import { Component, OnInit,NgModule, ElementRef } from '@angular/core';

import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-recordreview',
  templateUrl: './recordreview.component.html',
  styleUrls: ['./recordreview.component.scss']
})
export class RecordreviewComponent implements OnInit {
loading: boolean = false;
patients : any[] = [];
user  : any;

  constructor(public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,
    private http: Http) { 
  	
  }

  ngOnInit() {
    var data = localStorage.getItem('doctor');
    if(data) this.user = JSON.parse(data);
    this.getAllPatient();
  }

  getAllPatient(){
   this.loading=true;
   let postData = { doctorId : this.user._id};
   const url=this.globalService.basePath+'doctor/getAllPatient';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.patients = res.json().data;
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

  seeEHRhistory(patient){
     this.loading=true;
   let postData = { doctorId : this.user._id,patientId : patient._id,mobileNo : patient.mobileNo};
   // const url=this.globalService.basePath+'doctor/recordReview';
   const url=this.globalService.basePath+'doctor/PermisssionDoctor';
   
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        // this.patients = res.json().data;
        this.router.navigate(['/doctor/seeEHR/'+patient.mobileNo]);
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    }); 
  }

}
