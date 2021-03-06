import { Component, OnInit,NgModule, ElementRef } from '@angular/core';

import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import {Http} from '@angular/http';
declare var $: any;

@Component({
  selector: 'app-uploadbill',
  templateUrl: './uploadbill.component.html',
  styleUrls: ['./uploadbill.component.scss']
})
export class UploadbillComponent implements OnInit {
billForm : FormGroup;
loading : boolean = false;
user : any ;
  constructor(public globalService:GlobalServiceService,
  	private router: Router,
  	private fb: FormBuilder,
    private http: Http) { 
        var data = localStorage.getItem('labs');
         this.user=JSON.parse(localStorage.getItem('labs'));
                   var status = this.globalService.islabsLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
        if(data) {
        	this.user = JSON.parse(data);

        }
  } 

  ngOnInit() {
  	this.billFormInit();
  }

   billFormInit(){
    this.billForm = this.fb.group({  
              labId : new FormControl('',),    
              aadharno : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^((?!(0))[0-9]{12,12})$/)])), 	   
              filename : new FormControl(''),
              description : new FormControl(''),
          })
  }
  
sendRequest(){
  
	if(this.billForm.value.filename){
		  this.loading=true;
		   let labId = this.user._id;
		   this.billForm.value.labId = labId;
		   this.billForm.value.aadharno = this.billForm.value.aadharno.toString();
		   console.log("this.billForm.value.aadharno = = "+this.billForm.value.aadharno);
		   let postData = this.billForm.value;		   
		   const url=this.globalService.basePath+'lab/uploadbills';
		   this.http.post(url,postData).subscribe((res)=>{
		      this.loading=false;
		      if(res.json().status===200){      
		        this.globalService.showNotification(res.json().message,2);
		        this.billForm.reset();        
		      }else{
		        this.globalService.showNotification(res.json().message,4);
		      }
		    });
	}else{
		this.globalService.showNotification('Please choose bill first',4);
	}
  
  }

  uploadImage(event){  
     let reader = new FileReader();
     let file = event.target.files[0];
     reader.onloadend = (e:any) => {
     	let filePDF=e.target.result;
       this.billForm.value.filename = filePDF;
       
     }
      reader.readAsDataURL(file)
   }



 reset(){
    this.billForm.reset();
  }
  minus(e){
          if (e.keyCode === 189 ) {return false;}
  }

}
