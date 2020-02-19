import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, User } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TodoGuard implements CanActivate {
    currUser: User;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.authService.currUserSubj.subscribe(user => {
            this.currUser = user;
        });
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if(this.currUser && this.currUser._id) return true;
        return this.router.navigateByUrl('');
    }
}

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    currUser: User;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.authService.currUserSubj.subscribe(user => {
            this.currUser = user;
        });
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if(!this.currUser || !this.currUser._id) return true;
        return this.router.navigateByUrl('/todo');
    }
}
