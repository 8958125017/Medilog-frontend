import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
@Component({
  selector: 'app-pendingpatient',
  templateUrl: './pendingpatient.component.html',
  styleUrls: ['./pendingpatient.component.scss']
})
export class PendingpatientComponent implements OnInit {
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
  	this.getAllPatients();
  }

  getAllPatients(){
   this.loading=true;
   const url=this.globalService.basePath+'admin/getRequest';
    this.ng4LoadingSpinnerService.show();
   this.globalService.GetRequest(url).subscribe((res)=>{
      this.ng4LoadingSpinnerService.hide();
      this.loading=false;
      if(res.json().status===200){
      	this.patients = res.json().data[1].patient;
        // this.globalService.showNotification(2,res.json().msg);
      }else{
        this.globalService.showNotification(res.json().msg,4);
      }
    });
  }

  checkRequest(item,status){
    let url ='';
    if(status==='approve') url=this.globalService.basePath+'admin/approvedRequest';
    else url=this.globalService.basePath+'admin/blockRequest';
    this.loading=true;
    var postData = {requestType : 'patient',mobileNo : item.mobileNo};
    this.ng4LoadingSpinnerService.show();
   this.globalService.PostRequest(url,postData).subscribe((res)=>{
      this.ng4LoadingSpinnerService.hide();
      this.loading=false;
      if(res.json().status===200){
        this.router.navigate(['/admin/patients']);
      	// this.router.navigateByUrl('/patients');
        this.globalService.showNotification(res.json().message,2);
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

}
