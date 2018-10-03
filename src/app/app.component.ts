import { Component} from '@angular/core';
import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
public toasterconfig : ToasterConfig = 
      new ToasterConfig({
          showCloseButton: true, 
          tapToDismiss: false, 
          timeout: 2000
      });

      constructor(){
        //localStorage.clear();
      }
      ngOnInit(){
      	
      }
}
