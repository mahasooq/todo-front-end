import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo, TodoForCreation } from './models/todo/todo';
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
  onSubmit(form: NgForm) {
    console.log(form.controls['title'].value);
    let todo = new TodoForCreation(form.controls['title'].value, false);    
    this.createTodo(todo);
    form.controls['title'].setValue('');
  }
  getTodos() {
    this.repository.getData('todo')
    .subscribe(res => {
      let response: any = res;
      this.todoList = response.data as Todo[];
    })
  }
  createTodo(todo: TodoForCreation) {
    this.repository.create('todo', todo)
    .subscribe(res => {
      this.getTodos();
    })
  }
  setStatus(todo: Todo, event: any){
    let field = {
      completed: event.target.checked
    }

    this.repository.update(`todo/${todo._id}`, field)
    .subscribe(res => {
      this.getTodos();
    })
  }
  deleteTodo(todo: Todo) {    
    this.repository.delete(`todo/${todo._id}`)
    .subscribe(res => {
      this.getTodos();
    })
  }
  updateTodo(todo: Todo, event: any) { 
    let field = {
      title: event.target.value
    }
    this.repository.update(`todo/${todo._id}`, field)
    .subscribe(res => {
      this.getTodos();
    })
  }
}
