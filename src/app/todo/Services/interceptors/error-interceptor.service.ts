import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDetectionService } from '../error-detection.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorDetectionService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.handleError(error);
        return throwError(error);
      })
    );
  }
}
