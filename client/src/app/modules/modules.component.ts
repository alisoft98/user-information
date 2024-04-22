import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-modules',
  template: `
  <app-header></app-header>
  <div  style=" max-height: 90vh;min-height: 90vh; overflow: scroll;">
  <router-outlet ></router-outlet>
  </div>
  <app-footer></app-footer>`,
  styles: ``
})
export class ModulesComponent implements AfterViewInit {

  constructor(private cdr: ChangeDetectorRef,){

  }

  ngAfterViewInit(): void {
      this.cdr.detectChanges();
  }
}
