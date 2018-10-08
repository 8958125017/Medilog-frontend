import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute,
	            private router: Router,	       
	            public globalService:GlobalServiceService) { 
                  var status = this.globalService.ispatientLogedIn();
                  if(status==false){
                   this.router.navigateByUrl('/login');
                  }
  }

  ngOnInit() {
  }

}
