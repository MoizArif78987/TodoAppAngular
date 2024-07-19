import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorDetectionService {
    handleError(err:HttpErrorResponse){
        let errMsg=""
        if(err.status ===401)
        {
            errMsg="User is Not authorized"
        }
        else if(err.status===404)
        {
            errMsg="Not Found"
        }
        else{
            errMsg="Its not you its us, We are trying to fix the issue please try later"
        }
        return throwError(errMsg)
    }
}