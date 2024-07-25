import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retryWhen, scan, delay } from 'rxjs/operators';
import { Todo } from '../Models/todo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  ApiUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  createTodo(data: Todo): Observable<any> {
    return this.http.post(`${this.ApiUrl}/todos.json`, data, { observe: 'events' });
  }

  getTodos() {
    return this.http.get(`${this.ApiUrl}/todos.json`).pipe(
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
        let users = [];
        for (let key in data) {
          users.push({ ...data[key], key: key });
        }
        return users;
      })
    );
  }

  delete(key: string): Observable<any> {
    return this.http.delete(`${this.ApiUrl}/todos/${key}.json`, { observe: 'events' });
  }

  updateTodo(key, check): Observable<any> {
    return this.http.patch(`${this.ApiUrl}/todos/${key}.json`, { checked: check }, { observe: 'events' });
  }
  
}
