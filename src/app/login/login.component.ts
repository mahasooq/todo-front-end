import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginGroup: FormGroup

    constructor(
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.createForms();
    }

    createForms() {
        this.loginGroup = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        })
    }
    login() {
        if (this.loginGroup.valid)
            this.authService.loginUser(this.loginGroup.value);
    }
}
