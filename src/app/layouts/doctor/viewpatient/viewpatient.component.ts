import { Component, OnInit,NgModule, ElementRef } from '@angular/core';

import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $: any;

@Component({
  selector: 'app-viewpatient',
  templateUrl: './viewpatient.component.html',
  styleUrls: ['./viewpatient.component.scss']
})
export class ViewpatientComponent implements OnInit {
loading: boolean = false;
patients : any[] = [];
user  : any;
p: number = 1;
  constructor(public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,
    public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,
    private http: Http) { 
  	
  }

  ngOnInit() {
    var data = localStorage.getItem('doctor');
    if(data) this.user = JSON.parse(data);
    this.getAllPatient();
  }

  getAllPatient(){
   this.loading=true;
   this.ng4LoadingSpinnerService.show();
   let postData = { doctorId : this.user._id,stream : "patient",multichainAddress : this.user.multichainAddress};
   const url=this.globalService.basePath+'doctor/getAllPatient';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.patients = res.json().data;
        debugger
        this.ng4LoadingSpinnerService.hide();
        this.loading =false;
      }else{
        this.globalService.showNotification(res.json().msg,4);
      }
    });
  }


  deletePatient(patient){
    // Pull from the array
    this.loading=true;
   let postData = { doctorId : this.user._id,patientId : patient._id};
   const url=this.globalService.basePath+'doctor/deletePatientByDoctor';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.globalService.showNotification(res.json().message,2);
        this.getAllPatient();
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

  seeEHRhistory(patient){
    this.router.navigate(['/doctor/seeEHR/'+patient.aadharNo+'/'+patient.firstName+' '+patient.lastName]);
  }

  createPrescription(patient){
   this.router.navigate(['/doctor/createprescription/'+patient.aadharNo]); 
  }
}
