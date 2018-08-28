import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { GlobalService } from '../global.service';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
declare var $: any;
import * as moment from 'moment';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
name : any;
email : any;
keyForm: FormGroup;
user  :any;
loading:boolean=false;
public min = new Date();
bills :any[] = [];
uploadBoolean:boolean=true;

  constructor(private http: Http, private fb: FormBuilder,public globalService:GlobalService,private router : Router) { }

  
  ngOnInit() {
  	this.keyFormInit();

    $("#uploadBtn").on('change',()=>{
        var fileReader = new FileReader();
        fileReader.onload = () =>{
        var dataFile = fileReader.result;  // data <-- in this var you have the file data in Base64 format
        var obj = {billType : 'bill',filename : dataFile};
       this.uploadBillssss(obj);
       };
      fileReader.readAsDataURL($('#uploadBtn').prop('files')[0]);
      });

    $("#uploadBtn1").on('change',()=>{
        var fileReader = new FileReader();
        fileReader.onload = () =>{
        var dataFile = fileReader.result;  // data <-- in this var you have the file data in Base64 format
        var obj = {billType : 'prescription',filename : dataFile};
       this.uploadBillssss(obj);
       };
      fileReader.readAsDataURL($('#uploadBtn1').prop('files')[0]);
      });

    $("#uploadBtn2").on('change',()=>{
        var fileReader = new FileReader();
        fileReader.onload = () =>{
        var dataFile = fileReader.result;  // data <-- in this var you have the file data in Base64 format
        var obj = {billType : 'diagnostic',filename : dataFile};
       this.uploadBillssss(obj);
       };
      fileReader.readAsDataURL($('#uploadBtn2').prop('files')[0]);
      });

  }

  uploadBillssss(obj){
    this.loading=true;
    const url=this.globalService.basepath+'api/v1/medilocks/uploadBill';
    this.http.post(url,{filename : obj.filename}).subscribe((res)=>{
    this.loading=false;
      if(res.json().status===200){
         var currData = {billType : obj.billType,filehash : res.json().data[0].hash};
        this.bills.push(currData);
        this.keyForm.value.bills = this.bills;
        this.globalService.showNotification('top','right',2,res.json().message);
      }else{
        this.globalService.showNotification('top','right',4,res.json().message);
      }
    })
  }

   keyFormInit(){
      this.keyForm = this.fb.group({
            'employeeName' : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
            'employerName' :new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
            'billissueDate' : new FormControl(''),
            'disease' : new FormControl('',Validators.compose([Validators.required])),
            'degination' : new FormControl('',Validators.compose([Validators.required])),
        
        });
    }

 uploadBill(){
 	
      if(this.keyForm.value.hasOwnProperty('bills')){
          if(this.keyForm.value.bills.length >0){
           this.loading=true;
            var data = localStorage.getItem('currentUser');
            if(data){
                this.user = JSON.parse(data);
                this.keyForm.value.userId = this.user._id;
                const url=this.globalService.basepath + 'api/v1/medilocks/addLogs';                
                   this.http.post(url,this.keyForm.value).subscribe((res)=>{
                    this.loading=true;  
                    if(res.json().status===200){
                      this.keyForm.reset();         
                      this.globalService.showNotification('top','right',2,res.json().message);            
                    this.router.navigate(['dashboard/view-bills']);
                      this.keyFormInit();
                    }else{
                      this.globalService.showNotification('top','right',4,res.json().message);
                    }
             })
         }
        }
      }else{
        this.globalService.showNotification('top','right',4,"please uploads atleast one bills !");
      }
        
  }

}
