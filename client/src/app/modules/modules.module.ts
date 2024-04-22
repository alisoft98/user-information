import { NgModule } from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    ModulesComponent,
  ],
  imports: [
    ModulesRoutingModule,
    SharedModule,
  ]
})
export class ModulesModule { }
