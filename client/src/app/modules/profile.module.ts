import { NgModule } from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { DialogCalendarComponent } from './calendar/dialog-calendar/dialog-calendar.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [ModulesComponent, DialogCalendarComponent, CalendarComponent],
  imports: [ModulesRoutingModule, SharedModule],
})
export class ModulesModule {}
