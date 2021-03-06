import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-connect-device',
  templateUrl: './connect-device.component.html',
  styleUrls: ['./connect-device.component.scss']
})
export class ConnectDeviceComponent implements OnInit {

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
