import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { groupBy } from 'lodash';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';
import { routes } from '../../../app.routes';
import { NavItem } from '../../../shared/models/nav-items';
import { User } from '../../auth/models/user';
import { NavItemsService } from '../../services/nav-items.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Menu } from '../types/navItem';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
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
    HeaderComponent,
    FooterComponent,
    AsyncPipe,
    RouterLinkActive,
    MatTooltipModule,
    MatExpansionModule,
    LoaderComponent,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class SideBarComponent implements OnInit, OnDestroy {
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
  private ngUnsubscribe: Subject<any> = new Subject();
  username!: User;
  firstWord: string = '';
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  expandedSubMenus: { [key: number]: { [key: string]: boolean } } = {};

  private breakpointObserver = inject(BreakpointObserver);
  rootRoutes = routes.filter(r => r.path);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private navService: NavItemsService,
    private router: Router,
    private observer: BreakpointObserver
  ) {
    // this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getNavItems();
    // this.observer
    //   .observe(['max-with:800px'])
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe(screenSize => {
    //     if (screenSize.matches) {
    //       this.isMobile = true;
    //     } else {
    //       this.isMobile = false;
    //     }
    //   });

    this.getUserDataFromLocalStorage();
  }

  getUserDataFromLocalStorage() {}

  getFirstWord(username: string): string {
    return username.charAt(0);
  }
  toggleSubmenu(index: number) {
    this.expandedMenus[index] = !this.expandedMenus[index];
  }

  getNavItems() {
    this.navService.getNavItems().subscribe({
      next: (res: any) => {
        this.groupedData = this.groupByMenu(res.data, 'menu_name');
      },
      error: e => console.error(e),
      complete: () => {},
    });
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  groupByMenu(data: Menu[], key: string) {
    return groupBy(data, key);
  }

  getMenuNames() {
    return Object.keys(this.groupedData);
  }

  trackByIndex(index: number) {
    return index;
  }

  trackByItem(index: number, item: any) {
    return item.menu_id;
  }
  isActive(link: string): boolean {
    return this.router.url === link;
  }

  trackByFn(index: number, item: any): any {
    return item.id; // Ensure each item has a unique identifier
  }
  toggleMenuItem(menuName: string) {
    const sub = this.groupedData[menuName][0].submenus;
    const path = this.groupedData[menuName][0].path;
    if (sub) {
      this.expandedMenus[menuName] = !this.expandedMenus[menuName];
      this.router.navigate([path]);
    } else {
    }
  }

  isMenuItemExpanded(menuName: string): boolean {
    return !!this.expandedMenus[menuName];
  }

  isMenuExpanded(menuId: string): boolean {
    return this.expandedMenus[menuId];
  }
  logout() {
    this.router.navigate(['login']);
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
