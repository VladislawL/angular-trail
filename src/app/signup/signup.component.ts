import { Component } from '@angular/core';
import {UserSignUp} from "../shared/model/user";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../header/header.component";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    HeaderComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupError: boolean = false;

  user: UserSignUp = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get passwordMismatch(): boolean {
    return this.user.password !== this.user.confirmPassword;
  }

  onSubmit(signupForm: any) {
    if (signupForm.valid && !this.passwordMismatch) {
      this.authService.signup(this.user).subscribe({
        error: (err) => this.signupError = true,
        next: (user) => this.router.navigate(['/auth'])
      });
    }
  }
}
