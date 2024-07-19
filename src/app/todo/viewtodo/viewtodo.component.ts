import { Component, OnInit } from '@angular/core';
import { GetService } from '../Services/getTodos.service';
import { Todo } from '../Models/todo.model';

@Component({
  selector: 'app-viewtodo',
  templateUrl: './viewtodo.component.html',
  styleUrls: ['./viewtodo.component.css']
})
export class ViewtodoComponent implements OnInit {
  todoItems :Todo[]

  constructor(private getService:GetService) { }

  ngOnInit(): void {
    this.getService.getTodos().subscribe((data)=>{
      this.todoItems= data
    })
  }

}
