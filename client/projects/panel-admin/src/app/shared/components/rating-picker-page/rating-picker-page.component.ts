import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RatingPickerComponent ,RatingOptions} from 'ali';
import { EditableContentValueAccessor } from '../../directives/value-accessor/value.directive';

interface Rating {
  reviewText: string;
  reviewRating: RatingOptions;
}
@Component({
  selector: 'app-rating-picker-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditableContentValueAccessor,
    RatingPickerComponent,
  ],
  templateUrl: './rating-picker-page.component.html',
  styleUrl: './rating-picker-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingPickerPageComponent {
  form = this.fb.group<Rating>({
    reviewText: '',
    reviewRating: 'great'
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }
}
