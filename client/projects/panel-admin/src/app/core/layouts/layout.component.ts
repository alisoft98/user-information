import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
   SideBarComponent,
   RouterOutlet
   
    
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
 
}
