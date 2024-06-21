import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() onToggleMenu = new EventEmitter<any>();
  matcher = new MyErrorStateMatcher();
  showLng: any;

  languages = [
    { name: 'ENG', flag: 'assets/flags/ad.svg' },
    { name: 'CA', code: 'ca', flag: 'assets/flags/ca.svg' },
    { name: 'UK', flag: 'assets/flags/gb.svg' },
    { name: 'FR', flag: 'assets/flags/fr.svg' },
    { name: 'DE', flag: 'assets/flags/de.svg' },
    // add more countries as needed
  ];

  ngOnInit(): void {
    this.showLng = this.languages.find(lng => lng.name === 'ENG');

    if (localStorage !== undefined) {
      const userData = localStorage.getItem(JSON.parse('userData'));
    }
    debugger;
  }

  selectedCountry(lng: any) {
    this.showLng = lng;
    console.log(lng);
  }
  toggleSide(event: Event) {
    this.onToggleMenu.emit(event);
  }
}
