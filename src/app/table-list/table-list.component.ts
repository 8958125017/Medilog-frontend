import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import { GlobalService } from '../global.service';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { DomSanitizer } from '@angular/platform-browser';
 


declare var $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
keysArray : any[] = [];
imgsrc :any;
pdfsrc : any;
loading : boolean =false;
enableModel : boolean =false;
noBillAdded : boolean =false;
currentBillId : any;
keyItemId:any;
  constructor(public http : Http,routes:Router,private domSanitizer:DomSanitizer,private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,public globalService:GlobalService) {

  }
  // var filehash ="QmW9H9sASoyAfgJFgX6KcNbWxsTF6aezZSBAuuHjCNbMYu";
  viewLogById(billType){
    this.view(this.currentBillId,billType);
  }

  view(item,index){
    this.currentBillId = item;
    this.loading = true;
    this.imgsrc= '';
    this.pdfsrc= '';    
    this.enableModel = true;
    $('#noticeModal').modal();
      this.http.post(this.globalService.basepath+'api/v1/medilocks/getLogsById',{logId:item._id,logType:index}).subscribe((res)=>{
        this.ng4LoadingSpinnerService.show();
          if(res.json().status===200){
           
           if(res.json().data){
             this.loading = false;
             if(res.json().data.split(',')[0] === 'data:application/pdf;base64') 
             this.pdfsrc = 'data:application/pdf;base64,'+res.json().data.split('/pdfbase64')[1];
             else this.imgsrc = res.json().data;   
             this.noBillAdded = false;
           }else{
              this.loading = false;
             this.noBillAdded = true;
           }
         }else{
           this.globalService.showNotification('top','right',4,res.json().message);
          }
      });
  }
  
  delete(item:any){
         this.keyItemId=item._id;
        $('#deleteItembyIdmodel').modal('show');
      }


  confirmDelete(){
    this.http.post(this.globalService.basepath+'api/v1/medilocks/deletelog',{userid:this.keyItemId}).subscribe((res)=>{
      if(res.json().status===200){
         this.globalService.showNotification('top','right',2,res.json().message);
         this.ngOnInit();
       }else{
         this.globalService.showNotification('top','right',4,res.json().message);
       }
      });
  }

  ngOnInit() {
  this.loading=true;
    var user = localStorage.getItem('currentUser');
    var userData = JSON.parse(user);
    const url=this.globalService.basepath+'api/v1/medilocks/getAllLogs'
    this.http.post(url,{userId : userData._id}).subscribe((res)=>{
  		this.loading=false;      
      if(res.json().status===200){
  			this.keysArray=res.json().data;
  		}else{
  			this.globalService.showNotification('top','right',4,res.json().message);
  			// alert(res.json().message);
  		}
  	});
  }



}
