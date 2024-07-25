import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../Models/todo.model';

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

    private addCheckedProperty(body: Todo): Todo {
        return {
            ...body,
            checked: false
        };
    }
}
