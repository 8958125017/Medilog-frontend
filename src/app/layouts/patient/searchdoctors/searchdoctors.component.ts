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
public filterText: string;
nofoundStatus:boolean=false;
postData:any;
specialities:any=[];
search:any;
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
     this.getSpecialities();
  }

  getSpecialities(){
     const url=this.globalService.basePath+'doctor/gettypedoctor';
     this.globalService.PostRequestUnautorized(url).subscribe(response=>{
      if(response[0].json.status===200){
         this.specialities=response[0].json.data;
      }else{
         this.globalService.showNotification(response.json().message,4);
      }
    });
  }

  searchBYkey(event){
     this.postData = {
             patientId : this.user._id,
             kind : '',
             query : event.target.value,
             speciality : ''
         };
                  this.getData();
  }

  searchByCategory(event){
    this.search="";
     let patientId = this.user._id;
        this.loading=true;  
        if(event.target.value==='All'){
             this.postData = {
                 patientId : patientId,
                 kind : event.target.value,
                 query :'',
                 speciality : ''
           };
           this.getData();
        } else if(event.target.value==='EHR'){
             this.postData = {
               patientId : patientId,
               kind : event.target.value,
               query : '',
               speciality : event.target.value
             };
             this.getData();
        }else{
          this.postData = {
             patientId : patientId,
             kind:'',
             query : '',
             speciality : event.target.value
         };
         this.getData();
       }

  }
  getData(){
    const url=this.globalService.basePath + 'patient/viewAllDoctors';
     this.globalService.PostRequest(url,this.postData).subscribe((resposne)=>{
       debugger
        this.loading=false;
        var res=JSON.parse(resposne[0].json._body);
        if(res.status===200){
          this.doctors = res.data;
        }else{
          this.globalService.showNotification(res.message,4);
        }
      });
  }

  getAllDoctors(){
   this.loading=true;
   let patientId = this.user._id;
   const url=this.globalService.basePath+'patient/viewAllDoctors';
   this.http.post(url,{patientId :patientId}).subscribe((res)=>{     
      this.loading=false;
      if(res.json().status===200){
      	this.doctors = res.json().data;
        this.nofoundStatus=true;
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
