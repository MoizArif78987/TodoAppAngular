import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../Services/postTodos.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit {
  error: string;
  todoForm: FormGroup;
  disable: boolean = true
  constructor(private formBuilder: FormBuilder, private postService: PostService) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      todo: [null, [Validators.required]]
    })
    this.todoForm.valueChanges.subscribe((data) => {
      if (data.todo!=='') {
        this.disable=false
      }
      else{
        this.disable=true
      }
    }
    )
  }
  OnAddClick() {
    this.postService.createTodo(this.todoForm.value).subscribe((data) => {
      this.todoForm.reset()
    }, (error) => {
      this.error = error
    }
    )
  }
}
