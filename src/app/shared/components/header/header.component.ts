import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../auth/services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, FormsModule, NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  query: string = '';

  @Output()
  queryEvent = new EventEmitter<string>();

  constructor(private authService: AuthService) {}

  onSearch() {
    this.queryEvent.emit(this.query);
  }

  logout() {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
