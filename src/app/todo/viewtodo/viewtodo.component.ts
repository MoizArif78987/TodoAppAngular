import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewtodo',
  templateUrl: './viewtodo.component.html',
  styleUrls: ['./viewtodo.component.css']
})
export class ViewtodoComponent implements OnInit {
  todoItems =["I will pray 5 times", "I will make an angular app", "I will kill Thanos"]

  constructor() { }

  ngOnInit(): void {
  }

}
