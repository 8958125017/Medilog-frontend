import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-old-record',
  templateUrl: './add-old-record.component.html',
  styleUrls: ['./add-old-record.component.scss']
})
export class AddOldRecordComponent implements OnInit {

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
