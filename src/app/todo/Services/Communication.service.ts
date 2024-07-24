import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { Todo } from '../Models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  public todoSubject= new Subject<Todo>()
  constructor() { }

  sendTodo(data){
    this.todoSubject.next(data);
  }
}
