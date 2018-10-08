import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

  constructor() { }

  private subject = new Subject<any>();
 
    sendMessage(image: string,message:any) {    	
        this.subject.next(
            { 
        	     image: image,text:message
        	     
            }
        );
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }


}
