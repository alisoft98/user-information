import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavItemsService } from '../../services/nav-items.service';
import { NavItem, Submneu } from '../../../shared/models/nav-items';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  menuItem: NavItem[] = [];
  subMenus: Submneu[] = [];
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;

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
        this.menuItem = res.data;
        console.log('✅✅result menuItem', res);
      },
      error: e => console.error(e),
      complete: () => {},
    });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  getSubMenuItems(parentNavId: number) {
    this.navService.getSubmenuItems(parentNavId).subscribe({
      next: (res: any) => {
        const getStoreItem = localStorage.getItem('storeUser');
        const getItem = JSON.parse(getStoreItem || '{}');
        if (res) {
          if (res.data[0].permission === getItem.user?.role) {
            this.subMenus = res.data;
            console.log('✅result subMenus', res);
          }
          // res.subMenu?.find((sub) => sub.permission == getItem.user.role)
        }
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  navigateUrl() {
    const getUrl = this.subMenus.find(u => u.url);
    this.router.navigate([getUrl?.url]);
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      debugger;
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
