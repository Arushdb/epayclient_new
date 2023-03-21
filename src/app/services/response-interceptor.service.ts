import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable(
  //{
 
//}
)
export class ResponseInterceptorService implements HttpInterceptor  {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
    debugger;
    return next.handle(req).pipe(map((event: HttpEvent<any>) => { 
      
    

      if (event instanceof HttpResponse) {
          
      
       console.log(event);


      }
      return event;
  }));   
    
    
  }


}
