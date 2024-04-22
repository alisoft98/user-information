import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  
  animations: [
    trigger('showHide', [
      state('show', style({
        width: '300px',
      })),
      state('hide', style({
        width: '0px',
      })),
      transition('show => hide', [
        animate('0.2s')
      ]),
      transition('hide => show', [
        animate('0.2s')
      ])
    ])
  ],
})
export class SearchBarComponent {

  show: boolean;
  searchControl: FormControl;
  options: string[];
  filteredOptions!: Observable<string[]>;
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText = '';
  toggleSearch: boolean = false;
  
  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  constructor() {
    this.show = false;
    this.searchControl = new FormControl();
    this.searchControl.setValue('');
    this.options = ['One', 'Two', 'Three'];
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  isOpen() {
    if (this.show) {
      this.show = false;
      this.searchControl.setValue('');
    } else {
      this.show = true;
    }
  }
  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  clear() {
    this.searchControl.setValue('');
  }

}
