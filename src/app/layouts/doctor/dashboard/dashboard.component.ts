import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
public labels:any[]=[];
chartData:any=[
         {
           label: '',
           data: [] 
         },
      ];
user:any
patients : any[] = [];
p: number = 1;
totalpatients:number;
newpatients:number;
totalvisitLength:number;
todayVisitLength:number;
weekVisitLength:number;
monthVisitLength:number;
WeekData:any;
monthData:any;
yearData:any;
result:any;
constructor(public globalService:GlobalServiceService, private router: Router,public ng4LoadingSpinnerService:Ng4LoadingSpinnerService) { 
  this.user=JSON.parse(localStorage.getItem('doctor'));
    var status = this.globalService.isdoctorLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
                //this.dataBy('Weekly');
                //this.chartsData();
  }

  ngOnInit() {
    this.getChartData();
    this.getPatientsVisitList();
  }


// get chart data

    getChartData(){
        let postData = {
                        doctorId : this.user._id
                       
        }
        const url=this.globalService.basePath +'api/dashBoardData';
        this.ng4LoadingSpinnerService.show();
        this.globalService.PostRequest(url,postData).subscribe((response)=>{
        this.ng4LoadingSpinnerService.hide();               
        this.result=JSON.parse(response[0].json._body);
        if(this.result.status==200){
               this.totalpatients=this.result.data.totalPatient;
               this.newpatients=this.result.data.newPatient;
               this.totalvisitLength=this.result.data.totalVisit;
               this.todayVisitLength=this.result.data.todayVisitor;
               this.weekVisitLength=this.result.data.totalWeekVisitor;
               this.monthVisitLength=this.result.data.totalMonthVisitor;
               this.dataBy('Weekly');
        }else{
              this.globalService.showNotification(this.result.message,4);
        }
    })
  }

  dataBy(data:any){    
    if(data=="Weekly"){ 
    this.labels=[];  
      this.WeekData=this.result.data.weeklydata;
      var weeklabel=this.WeekData.labelw;
       for(var i=0;i<weeklabel.length;i++){
        this.labels.push(weeklabel[i]);
      }       
      setTimeout(() => {
      this.chartData = [
         {
           label: 'Visitors',
           data: this.WeekData.answ 
         },
      ];
    }, 50);

    //   this.labels =  ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    //    setTimeout(() => {
    //   this.chartData = [
    //      {
    //        label: 'Visitors',
    //        data: [11, 46, 2, 31, 45, 15, 9] 
    //      },
    //   ];
    // }, 50);

    }else if(data=="Monthly"){ 
    this.labels=[];
    this.monthData=this.result.data.monthlydata; 
     var monthlabel=this.monthData.ansm;
       for(var i=1;i<=monthlabel.length;i++){
        this.labels.push(i);
      }          
      setTimeout(() => {
      this.chartData = [
          {
            label: 'Visitors',
            data:this.monthData.ansm         
          },
        ];
    }, 50);

    //  this.labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31'] 
    //   setTimeout(() => {
    //   this.chartData = [
    //       {
    //         label: 'Visitors',
    //         data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59,21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59,21, 56, 4, 31, 45, 15,2] 
    //       },
    //     ];
    // }, 50);
     
    }else if(data=="Yearly"){
      this.labels=[];
      this.yearData=this.result.data.yearlydata;
      var yearLabel=this.yearData.labely
       for(var i=0;i<yearLabel.length;i++){
        this.labels.push(yearLabel[i]);
      } 
    
      setTimeout(() => {
    this.chartData = [
        {
          label: 'Visitors',
          data:this.yearData.ansy       
        },
      ];
    }, 50);
      
    }
    
  }

  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }


  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    // { 
    //   backgroundColor: 'rgba(30, 169, 224, 0.8)'
    // }
  ]
  
  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }

  // get visitor list

   getPatientsVisitList(){
        let postData = {
                        multichainAddress : this.user.multichainAddress,
                        stream:'patient'
        }
        const url=this.globalService.basePath +'doctor/recentVisitData';
        this.ng4LoadingSpinnerService.show();
        this.globalService.PostRequest(url,postData).subscribe((response)=>{
        this.ng4LoadingSpinnerService.hide();        
        var result=JSON.parse(response[0].json._body);
        if(result.status==200){
              this.patients=result.data;
        }else{
              this.globalService.showNotification(result.message,4);
        }
    })
  }

  // get total count or total visitor by week,month,year 
  
     getcountOfVisiters(){
        let postData = {
                        multichainAddress : this.user.multichainAddress,                       
        }
        const url=this.globalService.basePath +'doctor/recentVisitData';
        this.ng4LoadingSpinnerService.show();
        this.globalService.PostRequest(url,postData).subscribe((response)=>{
        this.ng4LoadingSpinnerService.hide();        
        var result=JSON.parse(response[0].json._body);
        if(result.status==200){
             this.totalpatients=result.data;
             this.newpatients=result.data;
             this.totalvisitLength=result.data;
             this.todayVisitLength=result.data;
             this.weekVisitLength=result.data;
             this.monthVisitLength=result.data;
        }else{
              this.globalService.showNotification(result.message,4);
        }
    })
  }

}
