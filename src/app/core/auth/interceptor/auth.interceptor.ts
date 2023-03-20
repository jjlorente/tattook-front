import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq;
        if(this.authService.isAuthenticated()){
            const headers = req.headers
                .set('Authorization', 'Bearer '+ this.authService.getToken());
            authReq = req.clone({ headers });
            return next.handle(authReq);
        }else{
            return next.handle(req);
        }
    }
}