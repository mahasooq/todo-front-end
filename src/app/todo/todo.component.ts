import { Component, OnInit } from '@angular/core';
import { Todo, TodoForCreation } from '../models/todo/todo';
import { RepositoryService } from '../services/repository/repository.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
    title = 'full-stack-todo-app';
    todoList: Todo[];
    constructor(
        private repository: RepositoryService,
        private authService: AuthService
        ) { }
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
                this.todoList = res as Todo[];
            })
    }
    createTodo(todo: TodoForCreation) {
        this.repository.create('todo', todo)
            .subscribe(res => {
                this.getTodos();
            })
    }
    setStatus(todo: Todo, event: any) {
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

    logOut() {
        this.authService.logOut();
    }
}
