import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AddCheckedPropertyInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'POST') {
            const modifiedReq = req.clone({
                body: this.addCheckedProperty(req.body)
            });
            return next.handle(modifiedReq);
        }
        return next.handle(req);
    }

    private addCheckedProperty(body: any): any {
        return {
            ...body,
            checked: false
        };
    }
}
