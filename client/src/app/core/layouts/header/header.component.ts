import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavItem } from '../../../shared/models/nav-items';
import { NavItemsService } from '../../services/nav-items.service';
import { groupBy } from 'lodash';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  menuItem: NavItem[] = [];
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  groupedData: any = {};
  menuMap: { [key: string]: MatMenu } = {};

  constructor(
    private navService: NavItemsService,
    private router: Router,
    private observer: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.getNavItems();
    this.observer.observe(['max-with:800px']).subscribe(screenSize => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }


  getNavItems() {
    this.navService.getNavItems().subscribe({
      next: (res: any) => {
        this.groupedData = this.groupByMenu(res.data, 'menu_name');
        console.log('✅', this.groupedData);
      },
      error: e => console.error(e),
      complete: () => {},
    });
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  groupByMenu(data: any[], key: string) {
    return groupBy(data, key);
  }

  getMenuNames() {
    return Object.keys(this.groupedData);
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
