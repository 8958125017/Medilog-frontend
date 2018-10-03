import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-health-analysis',
  templateUrl: './health-analysis.component.html',
  styleUrls: ['./health-analysis.component.scss']
})
export class HealthAnalysisComponent implements OnInit {

  constructor(private router: Router,	       
	        public globalService:GlobalServiceService) { 
   var status = this.globalService.ispatientLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
  }

  ngOnInit() {
  }

}
