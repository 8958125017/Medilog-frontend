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
  selector: 'app-addpharmacy',
  templateUrl: './addpharmacy.component.html',
  styleUrls: ['./addpharmacy.component.scss']
})
export class AddpharmacyComponent implements OnInit {
	accountType:string="pharmacy";
    pharmacyForm : FormGroup;
    loading : boolean = false;
    user :any;
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

  pharmacyFormInit(){
    this.pharmacyForm = this.fb.group({
        hospitalId : new FormControl('',),
        hospitalMultichainAddress : new FormControl(''),
        name: new FormControl('',Validators.required),
        email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
        password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
        address : new FormControl(''),
        license: new FormControl('', Validators.required),
        contactNo : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{6,15}$/)])),
        city : new FormControl('',Validators.required),
        open : new FormControl('',Validators.required),
        close : new FormControl('',Validators.required), 
        image : new FormControl(''),
        description:new FormControl(''),
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
  
  pharmacySignup(){
   this.loading=true;   
   this.pharmacyForm.value.image=this.userImage;
   this.pharmacyForm.value.hospitalId = this.user._id;
   this.pharmacyForm.value.hospitalMultichainAddress = this.user.multichainAddress;
   let postData = this.pharmacyForm.value;
   const url=this.globalService.basePath+'hospital/addPharmacy';
   this.ng4LoadingSpinnerService.show(); 
    
    this.globalService.PostRequestUnautorized(url,postData).subscribe((res)=>{      
       this.ng4LoadingSpinnerService.hide();  
       if(res[0].json.status===200){       
        this.globalService.showNotification(res[0].json.message,2);
        this.router.navigate(['/hospital/viewpharmacy'])
      }else{
        this.globalService.showNotification(res[0].json.message,4);
      }
    });
  }

     uploadImage(event){  
	     let reader = new FileReader();
	     let file = event.target.files[0];
	     reader.onloadend = (e:any) => {            
	           this.userImage= e.target.result;
	     }
	      reader.readAsDataURL(file)
   }

   reset(){
        this.pharmacyForm.reset();       
  }


  minus(e){
          if (e.keyCode === 189 ) {return false;}
  }

  ngOnInit() {
  	this.pharmacyFormInit();
  }

}
