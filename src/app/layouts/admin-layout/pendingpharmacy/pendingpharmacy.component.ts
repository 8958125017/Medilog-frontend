
import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-pendingpharmacy',
  templateUrl: './pendingpharmacy.component.html',
  styleUrls: ['./pendingpharmacy.component.scss']
})
export class PendingpharmacyComponent implements OnInit {
pharmacys : any[] = [];
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
  	this.getAllLabs();
  }

  getAllLabs(){
    debugger
   this.loading=true;
   const url=this.globalService.basePath+'admin/getRequest';
   this.http.get(url).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        debugger
      	this.pharmacys = res.json().data[3].pharmacy;
        // this.globalService.showNotification(2,res.json().msg);
      }else{
        this.globalService.showNotification(res.json().msg,4);
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
    this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.router.navigate(['/admin/pharmacy']);
      	// this.router.navigateByUrl('/patients');
        this.globalService.showNotification(res.json().message,2);
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

}
