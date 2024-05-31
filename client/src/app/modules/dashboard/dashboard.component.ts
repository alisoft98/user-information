import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ChipComponent } from '../../shared/components/chip/chip.component';
import { CustomTabComponent } from '../../shared/components/custom-tab/custom-tab.component';
import { ItemCardComponent } from '../../shared/components/item-card/item-card.component';
import { DemoComponent } from '../../shared/components/list-item-host-binding/demo/demo.component';
import { CanCopyToClipboardDirective } from '../../shared/directives/can-copy-to-clipboard/can-copy-to-clipboard.directive';
import { CanDisableDirective } from '../../shared/directives/can-disable/can-disable.directive';
import { HideAfterDirective } from '../../shared/directives/hide-after/hide-after.directive';
import { ProductUrlPipe } from '../../shared/pipes/product-url/product-url.pipe';
import { UsersComponent } from '../users/users.component';

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
    ProductUrlPipe,
    DemoComponent,
    CustomTabComponent,
    UsersComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  loading = true;
  disabled = true;

  dataTab = ['Users', 'Employee', 'Customers', 'Seller'];
  isShowTemp!: string;
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
  tags = ['Angular', 'Angular CDK', 'Angular Forms'];

  tabChange(tab: any) {
    switch (tab.textLabel) {
      case 'Employee':
        // this.isShowTemp = true;

        break;

      default:
        break;
    }
    tab.textLabel;

    debugger;
  }

  productId = 1;
}
