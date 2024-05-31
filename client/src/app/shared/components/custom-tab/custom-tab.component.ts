import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  input,
  viewChild,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'generic-tab',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './custom-tab.component.html',
  styleUrl: './custom-tab.component.scss',
})
export class CustomTabComponent implements OnInit {
  tabs = input.required<string[]>();
  tabContent = TemplateRef<any>;

  @Output() selectedIndexChange = new EventEmitter<any>();

  onTabChanged(index: any) {
    this.selectedIndexChange.emit(index);
  }

  ngOnInit(): void {
    // const factory = this.template.
  }
}
