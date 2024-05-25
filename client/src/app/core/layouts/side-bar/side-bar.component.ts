import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { groupBy } from 'lodash';
import { NavItem } from '../../../shared/models/nav-items';
import { NavItemsService } from '../../services/nav-items.service';

@Component({
  selector: 'side-bar',
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
    MatCardModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  menuItem: NavItem[] = [];
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  groupedData: any = {};
  menuMap: { [key: string]: MatMenu } = {};
  hasBackdrop = new FormControl(null as null | boolean);
  position = new FormControl('start' as 'start' | 'end');
  expandedMenus: { [key: string]: boolean } = {};

  constructor(
    private navService: NavItemsService,
    private router: Router,
    private observer: BreakpointObserver,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    // this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this._mobileQueryListener);
  }

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
        debugger;
        this.groupedData = this.groupByMenu(res.data, 'menu_name');
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

  trackByFn(index: number, item: any): any {
    return item.id; // Ensure each item has a unique identifier
  }

  getMenuIcon(menuName: string): string {
    return this.groupedData[menuName][0]?.icon || 'folder';
  }
  toggleMenuItem(menuName: string) {
    const sub = this.groupedData[menuName][0].submenu_name;
    const path = this.groupedData[menuName][0].path;
    debugger
    if(sub){
      this.expandedMenus[menuName] = !this.expandedMenus[menuName];
    }else{
      this.router.navigate([path])
    }
  }
  isMenuItemExpanded(menuName: string): boolean {
    return !!this.expandedMenus[menuName];
  }
}
