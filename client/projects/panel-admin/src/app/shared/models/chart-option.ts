import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexXAxis } from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries | any;
    chart: ApexChart | any;
    xaxis: ApexXAxis | any;
    dataLabels: ApexDataLabels | any;
    grid: ApexGrid | any;
    stroke: ApexStroke | any;
    title: ApexTitleSubtitle | any;
  };
  