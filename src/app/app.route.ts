import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoGuard, LoginGuard } from './services/auth/auth.guard';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
    {
        path: '', component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'todo', component: TodoComponent,
        canActivate: [TodoGuard]
    },
    // { path: '**', component: PageNotFoundComponent },
];