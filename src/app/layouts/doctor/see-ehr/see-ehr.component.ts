import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $: any;

@Component({
  selector: 'app-see-ehr',
  templateUrl: './see-ehr.component.html',
  styleUrls: ['./see-ehr.component.scss']
})
export class SeeEHRComponent implements OnInit {
aadharNo :any;
loading: boolean = false;
EHRhistory : any[] =[];
user  : any;
patientName :any;

  constructor(private domSanitizer:DomSanitizer,
  	public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,
    private http: Http,
    public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,
    private activatedRoute: ActivatedRoute) {
      this.user=JSON.parse(localStorage.getItem('doctor'));
            var status = this.globalService.isdoctorLogedIn();
                if(status==false){
                  this.router.navigateByUrl('/login');
                }
     }

  ngOnInit() {
  	 this.activatedRoute.params.subscribe((params: Params) => {
        this.aadharNo = params['aadharNo'];
        this.patientName = params['name'];
        this.seeEHRhistory(this.aadharNo);
      });
  }


  seeEHRhistory(aadharNo){
     this.loading=true;
   this.ng4LoadingSpinnerService.show();
   let postData = {aadharNo : aadharNo};
   // const url=this.globalService.basePath+'doctor/recordReview';
   const url=this.globalService.basePath+'patient/getPatientVisit';

   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        // this.patients = res.json().data;
        this.EHRhistory = res.json().data;
        this.ng4LoadingSpinnerService.hide();
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

}
