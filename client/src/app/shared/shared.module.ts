import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FooterComponent } from '../core/layouts/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ChunkPipe } from './pipes/chunk.pipe';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';

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
  MatSelectModule,
  MatButtonModule,
  CdkDropListGroup,
  CdkDropList,
  CdkDrag,
  DragDropModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  MatButtonModule,
  MatDialogModule,
  ReactiveFormsModule,
  DatePipe,
  MatIconModule,
  MatSelectModule,
];
const COMMON_MODULES = [CommonModule, ReactiveFormsModule, FormsModule];
// const SHARED_COMPONENT = [];
@NgModule({
  declarations: [
    SearchBarComponent,
    ChunkPipe,
  ],
  imports: [...COMMON_MODULES, ...ANGULR_MATERIAL_MODULES],
  exports: [...ANGULR_MATERIAL_MODULES, ...COMMON_MODULES,ChunkPipe,SearchBarComponent],
})
export class SharedModule {}
