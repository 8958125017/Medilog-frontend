import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import { Http } from '@angular/http';
declare var $: any;
import {BrowserModule, DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-ehrpull-history',
  templateUrl: './ehrpull-history.component.html',
  styleUrls: ['./ehrpull-history.component.scss']
})
export class EHRPullHistoryComponent implements OnInit {
user : any ;
loading : boolean = false;
mobileNo : any;
doctors : any[] = [];	
EHRhistory :any[] = [];
page:number = 1;
  pageurl:SafeResourceUrl;
  constructor(public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,
    private http: Http,private domSanitizer :DomSanitizer) {   
    
     var status = this.globalService.ispatientLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
     }

  ngOnInit() {
    var data = localStorage.getItem('patient');
    if(data) this.user = JSON.parse(data);
     this.getAllPullEHRrequestByDoctor();
     this.seeEHRhistory(this.user.aadharNo);
  }


getAllPullEHRrequestByDoctor(){
   this.loading=true;
   let postData = { patientId : this.user._id,doctorId :''};
   const url=this.globalService.basePath+'patient/viewPullEHRrequestByPatient';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.doctors = res.json().data.pullEHRrequests;
        // this.globalService.showNotification(res.json().message,2);
        // this.router.navigate(['/'])
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
    
  }

acceptPullEHRrequestByDoctor(doctor){
   this.loading=true;
   let postData = { patientId : this.user._id,doctorId :doctor.doctorId._id,mobileNo : this.user.mobileNo};
   const url=this.globalService.basePath+'patient/acceptPullEHRrequestByDoctor';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.globalService.showNotification(res.json().message,2);
        this.getAllPullEHRrequestByDoctor();
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
    
  }


 deniedPullEHRrequestByDoctor(doctor){
   this.loading=true;
   let postData = { patientId : this.user._id,doctorId :doctor.doctorId._id,mobileNo : this.user.mobileNo};
   const url=this.globalService.basePath+'patient/deniedPullEHRrequestByDoctor';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
         this.globalService.showNotification(res.json().message,2);
         this.getAllPullEHRrequestByDoctor();
      }else{
         this.globalService.showNotification(res.json().message,4);
      }
    });
 } 


  seeEHRhistory(aadharNo){
     this.loading=true;
   let postData = {aadharNo : aadharNo};
   // const url=this.globalService.basePath+'doctor/recordReview';
   const url=this.globalService.basePath+'patient/getPatientVisit';
   
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        // this.patients = res.json().data;
        debugger
        this.EHRhistory = res.json().data;
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    }); 
  }

}
