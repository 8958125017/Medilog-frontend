import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../../.././global-service.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-discoverinsurence',
  templateUrl: './discoverinsurence.component.html',
  styleUrls: ['./discoverinsurence.component.scss']
})
export class DiscoverinsurenceComponent implements OnInit {

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
