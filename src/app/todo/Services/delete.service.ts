import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retryWhen, scan } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorDetectionService } from './error-detection.service';
import { Todo } from '../Models/todo.model';

@Injectable({
    providedIn: 'root'
})
export class DeleteService {
    constructor(private http: HttpClient, private errorService: ErrorDetectionService) { }

    delete(key: string): Observable<any> {
        return this.http.delete(`https://angular-training-a6f1b-default-rtdb.firebaseio.com/todos/${key}.json`,
            { observe: 'events' })
            .pipe(
                catchError(this.errorService.handleError)
            );
    }
}
