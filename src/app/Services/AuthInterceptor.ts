import { HttpEvent,HttpHandler,HttpInterceptor,HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(){}
  intercept(req: HttpRequest<unknown>, next: HttpHandler ):Observable<HttpEvent<unknown>>{
    const Token = localStorage.getItem('tokken')
    if(Token){
      console.log("Token Here")
        console.log(Token)
        req = req.clone({
          setHeaders: {
            'Authorization': `bearer ${Token}`
          }
        });
    }
      console.log("hay")
      console.log(req)
      return next.handle(req)


  }
}
