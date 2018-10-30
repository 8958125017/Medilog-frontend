import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
 import  * as moment from 'moment';
@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  bp:any;
  sugar:any;
  weight:any;
  result:any;
  user:any;
  public labels1:any[]=[];
  public labels2:any[]=[];
  public labels3:any[]=[];
  chartData1:any=[
           {
             label: '',
             data: [] 
           },
        ];

      
      chartData2:any=[
               {
                 label: '',
                 data: [] 
               },
            ];

      
      chartData3:any=[
               {
                 label: '',
                 data: [] 
               },
            ];
  constructor(public globalService:GlobalServiceService, private router: Router,public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) { 
                 this.user=JSON.parse(localStorage.getItem('patient'));
                  var status = this.globalService.ispatientLogedIn();
                  if(status==false){
                   this.router.navigateByUrl('/login');
                  }
  }


  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  



  
  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }

  ngOnInit() {
    this.getChartData();
  }



  getChartData(){
        let postData = {
                        patientId : this.user._id
                       
        }
        const url=this.globalService.basePath +'patient/fetchPatientVitialInfo';
        this.ng4LoadingSpinnerService.show();
        this.globalService.PostRequest(url,postData).subscribe((response)=>{
        this.ng4LoadingSpinnerService.hide(); 
                      debugger
        var res=JSON.parse(response[0].json._body);
        if(res.status==200){
               this.result = res.data;
               this.bp     = this.result.bp.latestBloodPressure;
               this.sugar  = this.result.su.latestSugar;
               this.weight = this.result.wt.latestWeight;  
               this.labels1=[]; 
               var bpLabel=this.result.bp.labelBP;
                 for(var i=0;i<bpLabel.length;i++){
                 this.labels1.push(moment(bpLabel[i]).format('DD-MM-YYYY'));
               }       
               setTimeout(() => {
               this.chartData1 = [
                  {
                    label: 'BP',
                    data: this.result.bp.bloodPressure 
                  },
                ];
              }, 50);   
               debugger
              this.labels2=[]; 
               var suLabel=this.result.su.labelSugar;
                 for(var i=0;i<suLabel.length;i++){
                 this.labels2.push(moment(suLabel[i]).format('DD-MM-YYYY'));
               }       
               setTimeout(() => {
               this.chartData2 = [
                  {
                    label: 'sugar',
                    data: this.result.su.sugar 
                  },
                ];
              }, 60);  

              this.labels3=[]; 
               var wtLabel=this.result.wt.labelWt;
                 for(var i=0;i<wtLabel.length;i++){
                 this.labels3.push(moment(wtLabel[i]).format('DD-MM-YYYY'));
               }       
               setTimeout(() => {
               this.chartData3 = [
                  {
                    label: 'weight',
                    data: this.result.wt.weight 
                  },
                ];
              }, 70);          
            
        }else{
              this.globalService.showNotification(this.result.message,4);
        }
    })
  }


  // CHART COLOR.
  colors = [
    { 
      backgroundColor: 'rgba(228,41,127,1.00)'
    }
  ]



 

  // CHART COLOR.
  colors2 = [
    { 
      backgroundColor: 'rgba(54,235,127,1.00)'
    }
  ]
  // CHART COLOR.
  colors3 = [
    { 
      backgroundColor: 'rgba(253,233,127,1.00)'
    }
  ]


}
