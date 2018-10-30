import { Component, OnInit,NgModule, ElementRef } from '@angular/core';

import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Params}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-createprescription',
  templateUrl: './createprescription.component.html',
  styleUrls: ['./createprescription.component.scss']
})
export class CreateprescriptionComponent implements OnInit {
prescriptionForm : FormGroup;
medicineForm : FormGroup;
loading : boolean = false;
user : any ;
patients :any[] = [];
patientProfile :any;
aadharNo : any;
diseas:any=[];
diagonosis:any=[];
openInput:boolean=false;
data:any=[];
medicineDetail={
                 medicineName:"",
                 intake:"",
                 dose:"",
                 duration:""
               }
  selectedDose:any;
  selectedIntake:any;
  constructor(public globalService:GlobalServiceService,
  private router: Router,
  private fb: FormBuilder,
  private http: Http,
  private activatedRoute: ActivatedRoute,public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,) { 
   this.user=JSON.parse(localStorage.getItem('doctor'));
            var status = this.globalService.isdoctorLogedIn();
                if(status==false){
                  this.router.navigateByUrl('/login');
                }
  }

  ngOnInit() {
  	this.doctorFormInit();
  	var data = localStorage.getItem('doctor');
    if(data) this.user = JSON.parse(data);
    this.activatedRoute.params.subscribe((params: Params) => {
        this.aadharNo = params['aadharNo'];
        this.getPatientByAadharNo(this.aadharNo);
      });

    this.getAllPatient();
    this.getDeseas();
    this.getDiagonosis();
    this.medicineFormInit();
  }

  getDeseas(){
    debugger
    const url=this.globalService.basePath+'doctor/getDeseas';
     this.globalService.PostRequestUnautorized(url).subscribe(response=>{
      if(response[0].json.status===200){
         this.diseas=response[0].json.data;
      }else{
         this.globalService.showNotification(response.json().message,4);
      }
    });
  }

    getDiagonosis(){
    const url=this.globalService.basePath+'doctor/getDiagonosis';
     this.globalService.PostRequestUnautorized(url).subscribe(response=>{
      if(response[0].json.status===200){
         this.diagonosis=response[0].json.data;
      }else{
         this.globalService.showNotification(response.json().message,4);
      }
    });
  }


  doctorFormInit(){
    this.prescriptionForm = this.fb.group({
      aadharNo : new FormControl('',Validators.required),
      prescription : new FormControl('',Validators.required),
      diseas : new FormControl('',Validators.required),
      diagonosis : new FormControl('',Validators.required),
    })
  }

  getAllPatient(){
   this.loading=true;
   let postData = {stream:"patient", doctorId : this.user._id,multichainAddress : this.user.multichainAddress};
   const url=this.globalService.basePath+'doctor/getAllPatient';
   this.http.post(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.patients = res.json().data;
      }else{
        this.globalService.showNotification(res.json().msg,4);
      }
    });
  }

  createPrescription(){
  this.loading=true;
   let doctorId = this.user._id;
   this.prescriptionForm.value.patient = this.patientProfile;
   this.prescriptionForm.value.doctorId = doctorId;
   this.prescriptionForm.value.aadharNo = this.aadharNo;
   this.prescriptionForm.value.data = this.data;
   this.prescriptionForm.value.doctor = this.user;
   this.prescriptionForm.value.description = this.prescriptionForm.value.prescription;
   this.prescriptionForm.value.prescription = this.prescriptionForm.value.prescription;
   // this.prescriptionForm.value.patientId = this.prescriptionForm.value.patient;

   let postData = this.prescriptionForm.value;
   debugger
   const url=this.globalService.basePath+'doctor/createPrescription';
         this.ng4LoadingSpinnerService.show();
   this.http.post(url,postData).subscribe((res)=>{
           this.ng4LoadingSpinnerService.hide();
      this.loading=false;
      if(res.json().status===200){

        this.globalService.showNotification(res.json().message,2);
        this.prescriptionForm.reset();
        this.cancelMedicineDetail();
         this.router.navigate(['/viewpatients'])
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

  getPatientByAadharNo(aadharNo){
   this.loading=true;
   let postData = {requestType:"patient",key : aadharNo};
   const url=this.globalService.basePath+'doctor/getProfile';
   this.globalService.PostRequest(url,postData).subscribe((res)=>{
     debugger
      this.loading=false;
      var result=JSON.parse(res[0].json._body);
      if(result.status===200){
        this.patientProfile = result.data;
      }else{
        this.globalService.showNotification(res.json().msg,4);
      }
    });
  }
  selectDiseas(){
      this.openInput=true;
      $('#prescriptionModal').modal('show');
  }

  addMedicineDetail(){
    debugger
     // console.log(this.selectedDose);
        // console.log(this.selectedIntake);
    //this.openInput=false;
   // $('#prescriptionModal').modal('hide');
    this.data.push(this.medicineDetail);

    console.log("this.data = = "+JSON.stringify(this.data));
    this.cancelMedicineDetail();
  }

  cancelMedicineDetail(){
    this.medicineDetail = {
                 medicineName:"",
                 intake:"",
                 dose:"",
                 duration:""
               };
   this.medicineForm.reset();
  }
  medicineFormInit(){
     this.medicineForm=this.fb.group({
                 medicineName :new FormControl('',Validators.required),
                 intake :new FormControl('',Validators.required),
                 dose :new FormControl(''),
                 duration :new FormControl('',Validators.required)
  })

  }
 
 
  deleteMedicine(itemNo){
              var index = this.data.findIndex(function(o,index){
          return index === itemNo;
       })
       if (index !== -1) {this.data.splice(index, 1);
       }
    }

  reset(){
  	this.prescriptionForm.reset();
    this.medicineForm.reset();
  }
}
