import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {GlobalServiceService} from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(public router: Router, private global_service: GlobalServiceService){ }

	canActivate(){
		if(localStorage.getItem('admin')){
			return true;
		}else if(localStorage.getItem('patient')){
			return true;
		}else if(localStorage.getItem('doctor')){
			return true;
		}else if(localStorage.getItem('labs')){
			return true;
		}else if(localStorage.getItem('hospital')){
			return true;
		}else if(localStorage.getItem('pharmacy')){
			return true;
		}else{
			this.router.navigateByUrl('/login');	
			return false;
		}
	}
}
