import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { LineChartComponent } from '../../shared/components/charts/line-chart/line-chart.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [MatCardModule, MatGridListModule,LineChartComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss',
})
export class DoctorDashboardComponent {}
