import { Component } from '@angular/core';
import { CanCopyToClipboardDirective } from '../../shared/directives/can-copy-to-clipboard/can-copy-to-clipboard.directive';
import { AsyncPipe, NgIf } from '@angular/common';
import { HideAfterDirective } from '../../shared/directives/hide-after/hide-after.directive';
import { CanDisableDirective } from '../../shared/directives/can-disable/can-disable.directive';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ChipComponent } from '../../shared/components/chip/chip.component';
import { ItemCardComponent } from '../../shared/components/item-card/item-card.component';
import { ProductUrlPipe } from '../../shared/pipes/product-url/product-url.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonComponent,
    ChipComponent,
    CanCopyToClipboardDirective,
    AsyncPipe,
    NgIf,
    HideAfterDirective,
    CanDisableDirective,
    ItemCardComponent,
    ProductUrlPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  loading = true;
  disabled = true;

  onRemove(e: ChipComponent<string>) {
    alert(`Removed Chip: ${e.value}`);
  }


  product = {
    id: 1,
    name: 'Advanced Angular Forms',
    imageURL:
      'https://import.cdn.thinkific.com/420070%2Fcustom_site_themes%2Fid%2FtsCS7XUVR56XzU2wm6ma_600x384%402x.png',
    price: 99,
  };
  tags = ['Angular', 'Angular CDK', 'Angular Forms',];


  productId = 1;

}
