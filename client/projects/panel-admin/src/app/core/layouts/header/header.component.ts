import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MyErrorStateMatcher } from '../../../shared/input-validation/input-validation';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { ThemeManagerService } from '../../../shared/client-services/theme-manager.service';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink,
    MatIconModule,
    MatTooltipModule,
    AsyncPipe,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() onToggleMenu = new EventEmitter<any>();
  matcher = new MyErrorStateMatcher();
  today: number = Date.now();
  showLng: any;
  username: any;
  languages = [
    { name: 'ENG', flag: 'assets/flags/ad.svg' },
    { name: 'CA', code: 'ca', flag: 'assets/flags/ca.svg' },
    { name: 'UK', flag: 'assets/flags/gb.svg' },
    { name: 'FR', flag: 'assets/flags/fr.svg' },
    { name: 'DE', flag: 'assets/flags/de.svg' },
    // add more countries as needed
  ];

  private themeManager = inject(ThemeManagerService);
  theme = this.themeManager.theme;
  toggleTheme() {
    this.themeManager.toggleTheme();
  }

  
  ngOnInit(): void {
    this.showLng = this.languages.find(lng => lng.name === 'ENG');

    this.getUserData();
  }

  getUserData() {
    if (typeof localStorage !== 'undefined') {
      let ali = localStorage.getItem('userData');
      if (ali) {
        this.username = JSON.parse(ali);
      }
    }
  }

  selectedCountry(lng: any) {
    this.showLng = lng;
    console.log(lng);
  }
  toggleSide(event: Event) {
    this.onToggleMenu.emit(event);
  }
}
