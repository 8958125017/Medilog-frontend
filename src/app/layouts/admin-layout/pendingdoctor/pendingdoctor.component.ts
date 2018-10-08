import { Component, OnInit,NgModule, ElementRef } from '@angular/core';

import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-pendingdoctor',
  templateUrl: './pendingdoctor.component.html',
  styleUrls: ['./pendingdoctor.component.scss']
})
export class PendingdoctorComponent implements OnInit {
doctors : any[] = [];
loading : boolean = false;
p: number = 1;
  constructor(public globalService:GlobalServiceService,public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,
  	private router: Router,
  	private fb: FormBuilder,
    private http: Http) {
              var status = this.globalService.isadminLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
     }

  ngOnInit() {
  	this.getAllDoctors();
  }

   getAllDoctors(){
   this.loading=true;
   const url=this.globalService.basePath+'admin/getRequest';
    this.ng4LoadingSpinnerService.show();
   this.http.get(url).subscribe((res)=>{
      this.ng4LoadingSpinnerService.hide();
      this.loading=false;
      if(res.json().status===200){
      	this.doctors = res.json().data[0].doctors;
      }else{
        this.globalService.showNotification(4,res.json().msg);
      }
    });
  }

    checkRequest(item,status){
    let url ='';
    if(status==='approve') url=this.globalService.basePath+'admin/approvedRequest';
    else url=this.globalService.basePath+'admin/blockRequest';
    this.loading=true;
    var postData = {requestType : 'doctor',mobileNo : item.mobileNo};
    this.ng4LoadingSpinnerService.show();
   this.http.post(url,postData).subscribe((res)=>{
      this.ng4LoadingSpinnerService.hide();
      this.loading=false;
      if(res.json().status===200){
        this.router.navigate(['/admin/doctors']);
        this.globalService.showNotification(res.json().message,2);
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }


}
