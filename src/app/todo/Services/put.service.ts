import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retryWhen, scan } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorDetectionService } from './error-detection.service';

@Injectable({
    providedIn: 'root'
})
export class PutService {
    constructor(private http: HttpClient, private errorService: ErrorDetectionService) { }

    UpdateTodo(key,check): Observable<any> {
        return this.http.patch(`https://angular-training-a6f1b-default-rtdb.firebaseio.com/todos/${key}.json`, {checked:check}, { observe: 'events' })
            .pipe(
                catchError(this.errorService.handleError)
            );
    }
}
