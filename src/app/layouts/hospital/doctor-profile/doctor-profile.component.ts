	import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
	import { Router, ActivatedRoute,NavigationEnd,Params } from '@angular/router';
	import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
	import { Http, Headers, RequestOptions, Response  } from '@angular/http';
	import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
	import { GlobalServiceService}from'../../.././global-service.service';
	declare var $: any;

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {
user:any;
fullUserProfile:any;
loading : boolean = false;

  constructor(private http: Http,
	        private route: ActivatedRoute,
	        private router: Router,
	        private fb: FormBuilder,
	        private activatedRoute: ActivatedRoute,
	        public globalService:GlobalServiceService,
	        public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) { 
           var status = this.globalService.ishospitalLogedIn();
           if(status==false){
            this.router.navigateByUrl('/login');
           }
  }

  ngOnInit() {
  	 this.activatedRoute.params.subscribe((params: Params) => {
        let aadharNo = params['aadharNo'];
        this.getDoctorByAadharNo(aadharNo);
      });
  }


  getDoctorByAadharNo(id){
   this.loading=true;
   let postData = {requestType:"doctor",id : id};
   const url=this.globalService.basePath+'api/viewProfile';   
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){        
        this.fullUserProfile = res.json().data;
      }else{
        this.globalService.showNotification(res.json().msg,4);
      }
    });
  }

}
