import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() onToggleMenu = new EventEmitter<any>();

  toggleSide(event: Event) {
    this.onToggleMenu.emit(event);
  }
}
