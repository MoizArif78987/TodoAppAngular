import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retryWhen, scan } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorDetectionService } from './error-detection.service';
import { Todo } from '../Models/todo.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: HttpClient, private errorService: ErrorDetectionService) { }

    createTodo(data: Todo): Observable<any> {
        return this.http.post('https://angular-training-a6f1b-default-rtdb.firebaseio.com/todos.json', data, { observe: 'events' })
            .pipe(
                catchError(this.errorService.handleError)
            );
    }
}
