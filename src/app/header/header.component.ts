import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  query: string = '';

  @Output()
  queryEvent = new EventEmitter<string>();

  onSearch() {
    this.queryEvent.emit(this.query);
  }

}
