
import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
@Component({
  selector: 'app-pendingpharmacy',
  templateUrl: './pendingpharmacy.component.html',
  styleUrls: ['./pendingpharmacy.component.scss']
})
export class PendingpharmacyComponent implements OnInit {
pharmacys : any[] = [];
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
  	this.getAllLabs();
  }

  getAllLabs(){
    debugger
   this.loading=true;
   const url=this.globalService.basePath+'admin/getRequest';
   this.ng4LoadingSpinnerService.show();
   this.globalService.GetRequest(url).subscribe((res)=>{
     this.ng4LoadingSpinnerService.hide();
      this.loading=false;
      if(res[0].json.status===200){
        debugger
      	this.pharmacys = res[0].json.data[3].pharmacy;
        this.globalService.showNotification(2,res[0].json.message);
      }else{
        this.globalService.showNotification(res[0].json.message,4);
      }
    });
  }

  checkRequest(item,status){
    let url ='';
    if(status==='approve') {
      url=this.globalService.basePath+'admin/approvedRequest';
    }
    else {
      url=this.globalService.basePath+'admin/blockRequest';
    }
    this.loading=true;
    var postData = {requestType : 'pharmacy',mobileNo : item.contactNo,hospitalMultichainAddress: item.hospitalMultichainAddress};   
   this.ng4LoadingSpinnerService.show();
      this.globalService.PostRequest(url,postData).subscribe((res)=>{
      this.ng4LoadingSpinnerService.hide();
      this.loading=false;
      var result=JSON.parse(res[0].json._body)
      if(result.status===200){
        this.router.navigate(['/admin/pharmacy']);
        this.globalService.showNotification(result.message,2);
      }else{
        this.globalService.showNotification(result.message,4);
      }
    });
  }

}
