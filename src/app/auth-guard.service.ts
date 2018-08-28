import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Rx';
declare var $: any;
// import { GlobalService } from './GlobalService';
import { GlobalService }  from   './global.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(public router: Router, private global_service: GlobalService){ }

	canActivate(){
		if(localStorage.getItem('currentUser'))
			return true;
		else{
			this.showNotification('top','right',4,'Please Login First!.');
			this.router.navigateByUrl('/login');
			return false;
		}
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
