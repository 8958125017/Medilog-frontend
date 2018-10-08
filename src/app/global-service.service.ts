    import { Injectable, EventEmitter, Input, Output } from '@angular/core';
    import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
    import { Route, Router } from "@angular/router";
    import { FormControl } from '@angular/forms'
    import { Observable } from 'rxjs/Rx';
    import * as Rx from 'rxjs/Rx';
    import 'rxjs/add/observable/of';
    import 'rxjs/Rx';
    import 'rxjs/add/operator/map';
    import { ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';


    @Injectable({
      providedIn: 'root'
    })
    export class GlobalServiceService {
        public basePath: string;
        private toasterService: ToasterService;
        user:any;
        userInfo: any;
        userType:any;
        public headers: Headers;
        public requestoptions: RequestOptions;
        public res: Response;
        public loggedInObs: Rx.Subject<any> = new Rx.Subject<any>();
        isLogedInUser:boolean;

      constructor(
                    public http: Http,
                    public router: Router,
                     toasterService:ToasterService
                   )
                    {

                        this.basePath = "http://103.201.142.41:5005/";
                        // this.basePath = "http://192.168.0.71:5005/";
                     //  this.basePath = "http://192.168.0.57:5005/";
                      this.toasterService = toasterService
                     }

    			   showNotification(message, type) {
                        this.toasterService.clear();
    			         if(type==2){
    			          this.toasterService.pop('success', "", message);
    			         }
    			         if(type==4){
    			          this.toasterService.pop('error', "", message);
    			         }
    			    }



    	public getRequsetOptions(url: string): RequestOptions {
            let headers;
            if (localStorage.getItem('token')) {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'));
                headers = new Headers();
                headers.append("Content-Type", "application/json");
                headers.append("token",this.userInfo.token);
            }
            else {
                 // this.consoleFun('Unautorized Request !');
                 }
            let requestoptions = new RequestOptions({
                method: RequestMethod.Get,
                url: url,
                headers: headers
            });
            return requestoptions;
        }



        public PostRequestUnautorized(url?: string, data?: any): any {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            let requestoptions = new RequestOptions({
                method: RequestMethod.Post,
                url: url,
                headers: headers,
                body: JSON.stringify(data)
            });

            return this.http.request(new Request(requestoptions))
            .map((res: Response) => {
                return [{ status: res.status, json: res.json() }]
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
        }

        public PostRequest(url: string, data: any, flag?: any): any {
            var TOKEN=localStorage.getItem('token');
            let headers;
            headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("authorization","jwt "+TOKEN);
            this.requestoptions = new RequestOptions({
                method: RequestMethod.Post,
                url: url,
                headers: headers,
                body: JSON.stringify(data)
            })

            return this.http.request(new Request(this.requestoptions))
            .map((res: Response) => {
                if(res.status==200){
                   return [{ status: res.status, json: res }]
                }
            })
            .catch((error: any) => {
                if(error.status == 401){
                    localStorage.clear();
                    this.showNotification(error.json().err.object,4);
                    this.router.navigateByUrl('/login');
                }
                 if(error.status===0){
                   this.showNotification('No internet connection, Please try again!.',4);
               }
                return Observable.throw(error);
            });
        }

        public GetRequest(url: string): any {
            return this.http.request(new Request(this.getRequsetOptions(url)))
            .map((res: Response) => {
                let jsonObj: any;
                if (res.status === 204) {
                    jsonObj = null;
                }
                else {
                    jsonObj = res.json()
                }
                return [{ status: res.status, json: jsonObj }]
            })
            .catch(error => {
                if (error.status == 0)
                   // this.consoleFun('error here', error);
                return Observable.throw(error);
            });
        }



public logout(){
        //const url = this.basePath + "admin/logout" ;
        //let obj = {token:this.userInfo.token};
       // this.PostRequest(url,obj).subscribe(res => {
           // this.consoleFun(res[0].json.json());
             localStorage.clear();
            this.router.navigateByUrl('/login');
       // }, err => {
         //   this.consoleFun(err);
       // })
 }

isadminLogedIn(){
         this.user=JSON.parse(localStorage.getItem('admin'));
         if(this.user!=null||this.user!=undefined){
           return true;
         }{
             return false;
         }
    }
ishospitalLogedIn(){
         this.user=JSON.parse(localStorage.getItem('hospital'));
         if(this.user!=null||this.user!=undefined){
           return true;
         }else{
             return false;
         }
    }

ispatientLogedIn(){
         this.user=JSON.parse(localStorage.getItem('patient'));
         if(this.user!=null||this.user!=undefined){
           return true;
         }{
             return false;
         }
    }


ispharmacyLogedIn(){
         this.user=JSON.parse(localStorage.getItem('pharmacy'));
         if(this.user!=null||this.user!=undefined){
           return true;
         }{
             return false;
         }
    }

islabsLogedIn(){
         this.user=JSON.parse(localStorage.getItem('labs'));
         if(this.user!=null||this.user!=undefined){
           return true;
         }{
             return false;
         }
    }

    isLogedIn(){
         this.user=JSON.parse(localStorage.getItem('currentUser'));
         if(this.user!=null||this.user!=undefined){
           return true;
         }{
             return false;
         }
     }
      isdoctorLogedIn(){
         this.user=JSON.parse(localStorage.getItem('doctor'));
         if(this.user!=null||this.user!=undefined){
           return true;
         }{
             return false;
         }
     }


    }
