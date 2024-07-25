import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Todo } from '../../Models/todo.model';
import { CommunicationService } from '../../Services/Communication.service';
import { ConfirmationService } from '../../Services/Confirmation.service';
import { HttpEventType } from '@angular/common/http';
import { CrudService } from '../../Services/crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viewtodolist',
  templateUrl: './viewtodo.component.html',
  styleUrls: ['./viewtodo.component.css']
})
export class ViewtodoComponent implements OnInit, OnDestroy {
  todoItems: Todo[] = [];
  disableDelete = false;
  checklist: FormGroup;
  successful: number = 0;
  failed: number = 0;
  message: string = '';

  CommunicationSubscriber: Subscription
  ConfirmationSubscriber: Subscription
  GetDataSubscriber: Subscription
  OnDeleteSubscriber: Subscription
  UpdateSubscriber: Subscription

  constructor(
    private communication: CommunicationService,
    private confirmation: ConfirmationService,
    private crudService: CrudService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.checklist = this.formBuilder.group({
      checkedTodos: this.formBuilder.array([])
    });

    this.getdata();
    this.CommunicationSubscriber = this.communication.todoSubject.subscribe((data) => {
      const todo = data;
      this.todoItems.push(todo);
      this.addTodoToFormArray(todo);
    });
    this.ConfirmationSubscriber = this.confirmation.confirmationSubject.subscribe((data) => {
      this.getdata();
    });
  }

  ngOnDestroy(): void {
    this.CommunicationSubscriber.unsubscribe()
    this.ConfirmationSubscriber.unsubscribe()
    this.GetDataSubscriber.unsubscribe()
    this.OnDeleteSubscriber.unsubscribe()
    this.UpdateSubscriber.unsubscribe()
  }

  getdata(): void {
    this.GetDataSubscriber = this.crudService.getTodos().subscribe((data) => {
      this.todoItems = data;
      this.setTodosInFormArray(data);
    });
  }

  setTodosInFormArray(todos: Todo[]): void {
    const todosControl = this.checklist.get('checkedTodos') as FormArray;
    todosControl.clear();
    todos.forEach(todo => {
      if (!todo.checked) {
        todosControl.push(this.formBuilder.control(todo));
      }
    });
  }

  addTodoToFormArray(todo: Todo): void {
    const todosControl = this.checklist.get('checkedTodos') as FormArray;
    if (!todosControl.value.some((t: Todo) => t.key === todo.key)) {
      todosControl.push(this.formBuilder.control(todo));
    }
  }

  removeTodoFromFormArray(todo: Todo): void {
    const todosControl = this.checklist.get('checkedTodos') as FormArray;
    const index = todosControl.value.findIndex((t: Todo) => t.key === todo.key);
    if (index !== -1) {
      todosControl.removeAt(index);
    }
  }

  changeInCheckedTodos(i: number): void {
    const todosControl = this.checklist.get('checkedTodos') as FormArray;
    const todo = this.todoItems[i];
    const index = todosControl.value.findIndex((t: Todo) => t.key === todo.key);
    if (index === -1) {
      this.addTodoToFormArray(todo);
    } else {
      this.removeTodoFromFormArray(todo);
    }
  }

  OnDelete(key: string, i: number): void {
    this.OnDeleteSubscriber = this.crudService.delete(key).subscribe((data) => {
      if (data.type === HttpEventType.Sent) {
        this.disableDelete = true;
      }
      if (data.type === HttpEventType.Response) {
        this.disableDelete = false;
        this.todoItems.splice(i, 1);
        this.removeTodoFromFormArray(this.todoItems[i]);
      }
    }, (error) => {
      this.disableDelete = false;
    });
  }

  OnSave() {
    const todosControl = this.checklist.get('checkedTodos') as FormArray;
    const todosControlValue = todosControl.value;
    let updatedTodos = this.todoItems.map(todo => {
      const isChecked = (todosControlValue.some(controlTodo => controlTodo.key === todo.key));
      return {
        ...todo,
        checked: !isChecked
      };
    });
    updatedTodos.forEach((value) => {
    this.UpdateSubscriber =  this.crudService.updateTodo(value.key, value.checked).subscribe((data) => {
        if (data.type === HttpEventType.Response) {
          if (data.status === 200) {
            this.successful += 1;
          }
          else {
            this.failed += 1;
          }
        }
      }, (error) => {
        this.failed += 1;
      })
    })
    this.showMessage()
  }
  showMessage() {
    setTimeout(() => {
      this.message = `${this.successful} changes saved successfully, ${this.failed} failed`
    }, 1000)
    setTimeout(() => {
      this.successful = 0;
      this.failed = 0;
      this.message = ''
    }, 4000)
  }
  trackByIndex(index: number, item: Todo): number {
    return index;
  }
}
