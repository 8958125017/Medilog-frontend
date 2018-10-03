import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-searchdoctors',
  templateUrl: './searchdoctors.component.html',
  styleUrls: ['./searchdoctors.component.scss']
})
export class SearchdoctorsComponent implements OnInit {
doctors : any[]=[];
loading : boolean = false;
user : any ;

  constructor(public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,
    private http: Http) { 
      var status = this.globalService.ispatientLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
  }

 
  ngOnInit() {
    var data = localStorage.getItem('patient');
    if(data) this.user = JSON.parse(data);
    this.getAllDoctors();
  }

  searchByCategory(event){
    if(event.target.value==='All'){
      this.getAllDoctors();
    }else{
      this.loading=true;
     let patientId = this.user._id;
     let postData = {practiceSpecialties :event.target.value};
     const url=this.globalService.basePath+'patient/searchDoctorBySpeciality';
     this.http.post(url,postData).subscribe((res)=>{
        this.loading=false;
        if(res.json().status===200){
          this.doctors = res.json().data;
        }else{
          this.globalService.showNotification(res.json().message,4);
        }
      });
    }
  	 
  }

  getAllDoctors(){
   this.loading=true;
   let patientId = this.user._id;
   const url=this.globalService.basePath+'patient/viewAllDoctors';
   this.http.post(url,{patientId :patientId}).subscribe((res)=>{
     debugger
      this.loading=false;
      if(res.json().status===200){
      	this.doctors = res.json().data;
        // this.globalService.showNotification(res.json().message,2);
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

  viewDoctorProfile(aadharNo){
    this.router.navigate(['/patient/doctorProfile/'+aadharNo]);
  }
}
