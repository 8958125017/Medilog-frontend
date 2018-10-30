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
precreption : any[] =[];
user  : any;
patientName :any;
p: number = 1;
EHRhistoryss:boolean=false;
diagonosis:any;
deseas:any;
data:any;
prescription:any;
doctorName : any;
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
   const url=this.globalService.basePath+'doctor/getPatientVisit';
   this.globalService.PostRequestUnautorized(url,postData).subscribe((res)=>{
   debugger     
     this.ng4LoadingSpinnerService.hide();          
      this.loading=false;
      if(res[0].json.status===200){
        // this.patients = res.json().data;
        this.EHRhistory = res[0].json.data;
        console.log("this.EHRhistory = "+ JSON.stringify(this.EHRhistory ))
      }else{
        this.globalService.showNotification(res[0].json.message,4);
      }
    });
  }

  viewEHR(data:any){    
    this.precreption=data.data;
    this.doctorName=data.doctor.firstName+" "+data.doctor.lastName;
    this.diagonosis=data.diagonosis ?data.diagonosis : "NA";
    this.deseas=data.diseas ? data.diseas : "NA";
    this.data=data.date;
    this.prescription=data.prescription;
    debugger
    console.log("this.precreption = = "+this.precreption.length);
    this.EHRhistoryss=true;
     $('#prescriptionModal').modal('show');
       // window.open(data, '_blank')
  }

}
