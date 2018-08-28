import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';

import {Http} from '@angular/http';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
loading : boolean =false;
  loginDetail : any={
				   email       :'',
				   password    :'',
};
 constructor(
  	public globalService:GlobalService,
  	private router: Router,
  	private fb: FormBuilder,
    private http: Http,
  	) {

     }



  login(){
   
   this.loading=true;
   const url=this.globalService.basepath+'api/login';
    this.http.post(url,this.loginForm.value).subscribe((res)=>{
   localStorage.setItem('currentUser',JSON.stringify(res.json().data));
      this.loading=false;
      if(res.json().status===200){
        this.loginForm.reset();        
        this.router.navigate(['/dashboard/dashboard']);
        this.globalService.showNotification('top','right',2,res.json().msg);
      }else{
        this.globalService.showNotification('top','right',4,res.json().msg);
      }
    })
  }

  ngOnInit() {
  	this.signupFormInit();
  }



  signupFormInit(){
      this.loginForm = this.fb.group({
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
            'password': new FormControl('', Validators.required)

    });
  }

  


}
