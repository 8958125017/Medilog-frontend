	import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
	import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
	import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
	import { Http, Headers, RequestOptions, Response  } from '@angular/http';
	import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
	import {GlobalServiceService}from'../global-service.service';
	declare var $: any;

	@Component({
	  selector: 'app-user-profile',
	  templateUrl: './user-profile.component.html',
	  styleUrls: ['./user-profile.component.css']
	})
	export class UserProfileComponent implements OnInit {
	user:any;
	fullUserProfile:any;
	private updateUserForm:FormGroup;

	  constructor(
	       	private http: Http,
	        private route: ActivatedRoute,
	        private router: Router,
	        private fb: FormBuilder,
	        public globalService:GlobalServiceService,
	        public ng4LoadingSpinnerService:Ng4LoadingSpinnerService
	  	)                 { 

					          // if(!this.globalService.isLogedIn()){
					          //      this.router.navigate(['/login']);
					          //     }
					      this.user=JSON.parse(localStorage.getItem('currentUser'));
	                        }

								  ngOnInit() {
								  	this.getUserProfile();
								  	this.updateUserFormInit();
								  }

	///////////////////////////////////////////validation//////////////////////////////////////////////////////
								  updateUserFormInit(){
							      this.updateUserForm = this.fb.group({
							            'name': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-z A-Z]{3,342}$/)])),
							            'profession': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-z A-Z]{3,342}$/)])),
							            'mobile': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{10,10}$/)])),
							            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
							            'DOB': new FormControl('',Validators.required),
							            '_id': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9]{1,210}$/)]))
							            
							        });
							    }
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
										fillUserProfile(){
											this.updateUserForm.controls['name'].setValue(this.fullUserProfile.name);
											this.updateUserForm.controls['profession'].setValue(this.fullUserProfile.profession);
											this.updateUserForm.controls['mobile'].setValue(this.fullUserProfile.mobile);
											this.updateUserForm.controls['email'].setValue(this.fullUserProfile.email);
											this.updateUserForm.controls['DOB'].setValue(this.fullUserProfile.DOB);
											this.updateUserForm.controls['_id'].setValue(this.fullUserProfile._id);
										}
///////////////////////////////////////////////////////////////////////////////////////////////////////
					       getUserProfile(){
					       	let self = this;
	                            const url = this.globalService.basePath+'viewProfile';
	                            let data ={
									    _id:this.user._id
										}
	                              this.ng4LoadingSpinnerService.show();
				              this.globalService.PostRequestUnautorized(url,data)
				              .subscribe((response) => { 
				                  if(response[0].json.responseCode==200){            
				                        self.fullUserProfile=response[0].json.data;	
	                              this.ng4LoadingSpinnerService.hide();
				                   } else{
	                                  this.ng4LoadingSpinnerService.hide();
				                      this.globalService.showNotification(response[0].json.responseMessage,4);                     
				                   }
				             
				                      })

					          }


					          updateUserProfile(value){
	                            const url = this.globalService.basePath+'userUpdate';
	                             console.log(this.fullUserProfile);
	                             console.log("formvalue",value);
					          	// this.globalService.PostRequestUnautorized(url,data).subscribe((response) => { 
				            //         debugger;
				            //       if(response[0].json.responseCode==200){            
				            //             this.fullUserProfile=response[0].json.data;	
				            //           this.globalService.showNotification(response[0].json.responseMessage,2);                     

				            //           } else{                 
				            //           this.globalService.showNotification(response[0].json.responseMessage,4);                     
				            //            }
				             
				            //           })
					          }
	                            




	}
