import { NgModule } from '@angular/core';
import { CustomTabComponent } from '../shared/custom-tab/custom-tab.component';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [],
  imports: [CoreRoutingModule, CustomTabComponent, SharedModule],
  exports: [],
})
export class CoreModule {}
