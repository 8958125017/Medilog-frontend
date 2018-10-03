import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit {

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
