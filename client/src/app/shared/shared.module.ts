import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SearchBarComponent } from './search-bar/search-bar.component';




const ANGULR_MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatDividerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatToolbarModule,
  MatAutocompleteModule,
  
  MatSelectModule]
const COMMON_MODULES = [CommonModule,ReactiveFormsModule,FormsModule]
const SHARED_COMPONENT = [ FooterComponent,HeaderComponent]
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SearchBarComponent,
  ],
  imports: [
    ...COMMON_MODULES,
    ...ANGULR_MATERIAL_MODULES
  ],
  exports: [...ANGULR_MATERIAL_MODULES, ...COMMON_MODULES,...SHARED_COMPONENT]
})
export class SharedModule { }
