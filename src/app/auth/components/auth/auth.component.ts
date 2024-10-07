import {Component, OnInit} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginMode: boolean = true;

  loginError: boolean = false;
  signupError: boolean = false;

  user: any = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginMode = this.route.snapshot.paramMap.get('mode') !== 'signup';
    this.clearForm();
  }

  toggleMode(authForm: NgForm): void {
    this.loginMode = !this.loginMode;
    const newMode = this.loginMode ? 'login' : 'signup';

    this.router.navigate(['/auth', newMode]);
    this.clearForm();
    authForm.resetForm();
  }

  clearForm(): void {
    this.user = {
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.loginError = false;
    this.signupError = false;
  }

  get passwordMismatch(): boolean {
    return this.user.password !== this.user.confirmPassword;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.valid) {
      if (this.loginMode) {
        this.authService.login(this.user).subscribe({
          error: (err) => this.loginError = true,
          next: (user) => {
            if (user) {
              this.loginService.setAuthToken(user.id);
              this.router.navigate(['/']);
            } else {
              this.loginError = true;
            }
          }
        });
      } else {
        if (!this.passwordMismatch) {
          this.authService.signup(this.user).subscribe({
            error: (err) => this.signupError = true,
            complete: () => this.toggleMode(authForm)
          });
        }
      }
    }
  }
}
