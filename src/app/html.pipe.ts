import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class HtmlPipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}

   transform(html) {
     return this.sanitizer.bypassSecurityTrustResourceUrl(html);
   }

}


@Pipe({name: 'safe'})
export class Safe {
  constructor(private sanitizer:DomSanitizer){}

  transform(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }

}