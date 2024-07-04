import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';
import { routes } from '../../app.routes';
import { NavItemsService } from '../services/nav-items.service';
import { Menu } from './types/navItem';
import { groupBy } from 'lodash';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
   SideBarComponent
    
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
 
}
