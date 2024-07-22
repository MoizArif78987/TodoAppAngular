import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, retryWhen, scan } from 'rxjs/operators'
import { ErrorDetectionService } from './error-detection.service';

@Injectable({
    providedIn: 'root'
})
export class GetService{
    constructor(private http:HttpClient, private errorService:ErrorDetectionService){

    }
    getTodos(){
        return this.http.get(`https://angular-training-a6f1b-default-rtdb.firebaseio.com/todos.json`).pipe(
            catchError(this.errorService.handleError),
            retryWhen(errors => 
                  errors.pipe(
                    delay(2000),
                    scan((acc, error) => {
                      if (acc >= 3) {
                        throw error;
                      } else {
                        acc += 1;
                        return acc;
                      }
                    }, 0)
                  )
                ),
            map((data) => {
            let users=[]
            for (let key in data) {
                users.push({...data[key], key:key})
            }
            return users
        }))
    }
}