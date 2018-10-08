import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
import { Http } from '@angular/http';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $: any;
import  * as moment from 'moment';

@Component({
  selector: 'app-addlabs',
  templateUrl: './addlabs.component.html',
  styleUrls: ['./addlabs.component.scss']
})
export class AddlabsComponent implements OnInit {

  labForm : FormGroup;
  loading : boolean = false;
  user : any;
  userImage:any;
  constructor(public globalService:GlobalServiceService,
    private router: Router,
    private fb: FormBuilder,
    public ng4LoadingSpinnerService:Ng4LoadingSpinnerService,
    private http: Http) { 

    var data = localStorage.getItem('hospital');
    if(data) this.user = JSON.parse(data);

    var status = this.globalService.ishospitalLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
  }

labFormInit(){
    this.labForm = this.fb.group({
        hospitalMultichainAddress : new FormControl(''),
        name: new FormControl('',Validators.required),
        email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
        password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
        address  : new FormControl(''),
        license : new FormControl('',Validators.required),
        contactNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{6,15}$/)])),
        city : new FormControl('',Validators.required),
        from : new FormControl('',Validators.required),
        to : new FormControl('',Validators.required), 
        description: new FormControl(''), 
        image : new FormControl(''),
        confirmPassword:new FormControl('', Validators.required)}, { validator: this.matchingPasswords('password', 'confirmPassword') });
  }


  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {       
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

    uploadImage(event){  
	     let reader = new FileReader();
	     let file = event.target.files[0];
	     reader.onloadend = (e:any) => {    
         this.userImage = e.target.result;	          
	     }
	      reader.readAsDataURL(file)
   }

   labSignup(){      
   this.loading=true;   
   this.labForm.value.image = this.userImage;
   this.labForm.value.hospitalMultichainAddress = this.user.multichainAddress;
   let postData = this.labForm.value;
   const url=this.globalService.basePath+'lab/labSendRequestToAdmin';
   console.log("postData =  ="+JSON.stringify(postData));
   this.ng4LoadingSpinnerService.show();  
   this.globalService.PostRequest(url,postData).subscribe((res)=>{
      this.loading=false;
      if(res.json().status===200){
        this.ng4LoadingSpinnerService.hide();  
        this.globalService.showNotification(res.json().message,2);
        this.router.navigate(['/hospital/viewdiagnostic']);
      }else{
        this.globalService.showNotification(res.json().message,4);
      }
    });
  }

  reset(){
        this.labForm.reset();       
  }


  minus(e){
          if (e.keyCode === 189 ) {return false;}
  }


  ngOnInit() {
  	 this.labFormInit();
  }

}

