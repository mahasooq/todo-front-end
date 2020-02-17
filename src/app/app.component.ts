import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from './models/todo/todo';
import { RepositoryService } from './services/repository/repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'full-stack-todo-app';
  todoList: Todo[];
  constructor(private repository: RepositoryService) {}
  ngOnInit() {
    this.getTodos();
  }
  getTodos() {
    this.repository.getData('todo')
    .subscribe(res => {
      let response: any = res;
      this.todoList = response.data as Todo[];
    })
  }
}
