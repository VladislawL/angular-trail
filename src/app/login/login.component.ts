import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FormsModule} from "@angular/forms";
import {User} from "../shared/model/user";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginError: boolean = false;

  user: User = {
    id: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(authForm: any) {
    if (authForm.valid) {
      this.authService.login(this.user).subscribe({
        error: (err) => this.loginError = true,
        next: (user) => {
          if (user) {
            this.authService.setAuthToken(user.id);
            this.router.navigate(['/'])
          }
        }
      })
    }
  }
}
