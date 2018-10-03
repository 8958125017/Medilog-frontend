import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
keysArray : any[] = [];

  constructor(public http : Http,routes:Router) {

  }
  // var filehash ="QmW9H9sASoyAfgJFgX6KcNbWxsTF6aezZSBAuuHjCNbMYu";
          view(item){

          }
  ngOnInit() {
    var filehash ="QmW9H9sASoyAfgJFgX6KcNbWxsTF6aezZSBAuuHjCNbMYu";

  	this.http.post('http://192.168.0.155:5000/api/v1/medilocks/getAllLogs',{userId : '5b7519498260761f7f41686c'}).subscribe((res)=>{

  		if(res.json().status===200){
  			// alert(res.json().message);

  			this.keysArray=res.json().data;
        debugger;
  			this.showNotification('top','right',2,res.json().message);

  		}else{
  			this.showNotification('top','right',4,res.json().message);
  			// alert(res.json().message);
  		}
  	});
  }


    showNotification(from, align,color1,msg){
      const type = ['','info','success','warning','danger'];

      const color = color1;

      $.notify({
          icon: "notifications",
          message: msg

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }


}
