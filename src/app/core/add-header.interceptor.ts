import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestWithHeader: HttpRequest<any> = req.clone(
            {setHeaders: {"Content-Type": "application/json"}}
        );
        return next.handle(requestWithHeader);
    }
}