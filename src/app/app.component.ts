import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading: boolean = true;
  constructor(
    private authService: AuthService,
  ) {
    this.authService.currUserSubj.subscribe(user => {
      this.isLoading = false;
    });
  }
}
