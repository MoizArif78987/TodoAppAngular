import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddtodoComponent } from './components/addtodo/addtodo.component';
import { ViewtodoComponent } from './components/viewtodo/viewtodo.component';
import { ContainerComponent } from './container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddCheckedPropertyInterceptor } from './Services/addChecked-interceptor.service';



@NgModule({
  declarations: [
    AddtodoComponent,
    ViewtodoComponent,
    ContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddCheckedPropertyInterceptor,
      multi: true
    }
  ]
})
export class TodoModule { }
