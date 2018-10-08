import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
@Component({
  selector: 'app-pendinghospital',
  templateUrl: './pendinghospital.component.html',
  styleUrls: ['./pendinghospital.component.scss']
})
export class PendinghospitalComponent implements OnInit {
hospitals : any[] = [];
loading : boolean = false;
p: number = 1;
  constructor(public globalService:GlobalServiceService,
  	private router: Router,public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,
  	private fb: FormBuilder,
    private http: Http) { 
      var status = this.globalService.isadminLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
  }

  ngOnInit() {
  	this.getAllHospitals();
  }

  getAllHospitals(){
   this.loading=true;
   const url=this.globalService.basePath+'admin/getRequest';
     this.ng4LoadingSpinnerService.show();
   this.http.get(url).subscribe((res)=>{
       this.ng4LoadingSpinnerService.hide();
      this.loading=false;
      if(res.json().status===200){
        this.hospitals = res.json().data[2].hospital;      
      }else{
        this.globalService.showNotification(res.json().msg,4);
      }
    });
  }

  checkRequest(item,status){    
    let url ='';
    if(status==='approve') 
      {
         url=this.globalService.basePath+'admin/approvedRequest';
      }
    else {
         url=this.globalService.basePath+'admin/blockRequest';
    }
    this.loading=true;
    var postData = {requestType : 'hospital',mobileNo : item.contactNo};   
      this.ng4LoadingSpinnerService.show();
   this.http.post(url,postData).subscribe((res)=>{
       this.ng4LoadingSpinnerService.hide();
      this.loading=false;
      if(res.json().status===200){
        this.router.navigate(['/admin/hospitals']);      	
        this.globalService.showNotification(res.json().message,2);
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

}
