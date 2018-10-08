import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';

import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-labs-dashboard',
  templateUrl: './labs-dashboard.component.html',
  styleUrls: ['./labs-dashboard.component.scss']
})
export class LabsDashboardComponent implements OnInit {

  constructor(private router: Router,
	          public globalService:GlobalServiceService) { 
              var status = this.globalService.islabsLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
  }

  ngOnInit() {
  }

}
