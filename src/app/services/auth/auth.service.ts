import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
    _id: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    currUserSubj: ReplaySubject<User> = new ReplaySubject(1)

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.checkLoggedIn();
    }

    loginUser(data) {
        const url = environment.urlAddress + '/user/login'
        return this.http.post(url, data, { withCredentials: true }).subscribe((response: any) => {
            const user = (response && response.user) ? response.user : null
            if (user) { // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.currUserSubj.next(user);
                this.router.navigateByUrl('/todo');
            }
        })
    }

    checkLoggedIn() {
        const url = environment.urlAddress + '/user/login'
        return this.http.get(url, { withCredentials: true }).subscribe((response: any) => {
            const user = (response && response.loggedIn) ? response.user : null
            if (user) { // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.currUserSubj.next(user);
                this.router.navigateByUrl('/todo');
            }
            else this.currUserSubj.next(null);

        })
    }
    // register

    logOut() {
        const url = environment.urlAddress + '/user/logout'

        return this.http.get(url, { withCredentials: true }).subscribe((response: any) => {
            if (response && response.loggedOut) { // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.currUserSubj.next(null);
                this.router.navigateByUrl('');
            }
        })
    }

}