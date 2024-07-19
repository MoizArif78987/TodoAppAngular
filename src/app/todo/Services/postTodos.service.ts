import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators'
import { ErrorDetectionService } from './error-detection.service';

@Injectable({
    providedIn: 'root'
})
export class PostService{
    constructor(private http:HttpClient, private errorService:ErrorDetectionService){

    }
    createTodo(data){
        return this.http.post(`https://angular-training-a6f1b-default-rtdb.firebaseio.com/todos.json`, data).pipe(
            catchError(this.errorService.handleError)
        )
    }
}