import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from '../../Services/Communication.service';
import { HttpEventType } from '@angular/common/http';
import { ConfirmationService } from '../../Services/Confirmation.service';
import { CrudService } from '../../Services/crud.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit, OnDestroy {
  error: string;
  todoForm: FormGroup;
  disable: boolean = true
  array = [];

  GetDataSubscriber: Subscription
  AddTodoSubscriber: Subscription
  ValueChangeSubscriber: Subscription

  constructor(private formBuilder: FormBuilder,
    private crudService: CrudService,
    private communication: CommunicationService,
    private confirmation: ConfirmationService) { }

  ngOnInit(): void {
    this.getdata();
    this.todoForm = this.formBuilder.group({
      todo: [null, [Validators.required, this.isUnique.bind(this)]]
    })
    this.ValueChangeSubscriber = this.todoForm.valueChanges.subscribe((data) => {
      if (data.todo !== '') {
        this.disable = false
      }
      else {
        this.disable = true
      }
    }
    )
  }
  ngOnDestroy(): void {
    this.GetDataSubscriber.unsubscribe()
    this.AddTodoSubscriber.unsubscribe()
    this.ValueChangeSubscriber.unsubscribe()
  }
  getdata() {
    this.GetDataSubscriber= this.crudService.getTodos().subscribe(data => this.array = data)
  }
  isUnique(data: FormControl): { [key: string]: boolean } {
    if (this.array.some(current => current.todo.toUpperCase() === data.value?.trim().toUpperCase())) {
      this.disable = true
      return { IsNotUnique: true };
    }
    return null;
  }
  OnAddClick() {
    let todoControl = this.todoForm.get('todo');
    let trimValue = todoControl && todoControl.value ? todoControl.value.trim() : '';
    if (trimValue !== "") {
      this.todoForm.patchValue({
        todo: trimValue
      });
      this.AddTodoSubscriber = this.crudService.createTodo(this.todoForm.value).subscribe((data) => {
        if (data.type === HttpEventType.Sent) {
          this.communication.sendTodo(this.todoForm.value);
          this.todoForm.reset();
          this.disable = true;
        }
        if (data.type === HttpEventType.Response) {
          this.confirmation.sendConfirmation("received");
          this.getdata();
          this.disable = false;
        }
      }, (error) => {
        this.error = error;
        console.log(this.error);
        this.confirmation.sendConfirmation("error");
        this.disable = false;
      });

    } else {
      this.error = "Invalid entry";
    }
  }
}
