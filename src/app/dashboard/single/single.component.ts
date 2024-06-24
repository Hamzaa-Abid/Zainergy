import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { EmitterService } from 'src/app/shared/services/event-service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isPlatformBrowser } from '@angular/common';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'zainergy-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  private chart: am4charts.XYChart;
  public chart_data: any;
  public device_id: any;
  public parameters: any = [];

  constructor(private dashboardService: DashboardService, @Inject(PLATFORM_ID) private platformId, private zone: NgZone, private eventEmitter: EmitterService) {
    this.parameters = ['avg_vl_pn', 'avg_curr_3p', 'total_w', 'avg_pf_3p'];
  }

  ngOnInit(): void {
    this.eventEmitter.listen('getSelectedSingleDevice', (device_id) => {
      this.device_id = device_id;
      this.getSingleDeviceGraph();
    });
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  getSingleDeviceGraph() {
    // Chart code goes in here
    this.browserOnly(() => {

      this.getChartData();

    });
  }

  getChartData() {

    let voltage_data = []; let curr_data = [];
    let kw_data = []; let pf_data = [];
    let data = [];

    let date = new Date();
    let formatted_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    let body = {
      'action': 'getChartDataByAccount',
      'user_id': [localStorage.getItem('user')],
      'device_id': [this.device_id],
      'date': formatted_date,
      'fixed_interval': '1m',
      'parameters': this.parameters
    };

    this.dashboardService.httpPost(body).subscribe((res: any) => {

      if (res.data.buckets && res.data.buckets[0].date_agg) {
        data = res.data.buckets[0].date_agg.buckets;

        if (data.length > 0) {

          for (let i = 0; i < data.length; i++) {

            voltage_data.push({
              date: new Date(data[i].key_as_string),
              visits: data[i].val_avg_vl_pn.value
            });

            curr_data.push({
              date: new Date(data[i].key_as_string),
              visits: data[i].val_avg_curr_3p.value
            });

            kw_data.push({
              date: new Date(data[i].key_as_string),
              visits: data[i].val_total_w.value
            });

            pf_data.push({
              date: new Date(data[i].key_as_string),
              visits: data[i].val_avg_pf_3p.value
            });

          }
        }
      }

      let chart_vol_props = {
        element: 'chartVoltage',
        data: voltage_data,
        title: 'VOLTAGE',
        interval: {
          'interval': 'minute',
          'value': 5
        },
        tooltipFormat: 'HH:mm:ss, d MMMM',
        xScrollbar: true
      };

      let chart_curr_props = {
        element: 'chartCurr',
        data: curr_data,
        title: 'CURRENT',
        interval: {
          'interval': 'minute',
          'value': 5
        },
        tooltipFormat: 'HH:mm:ss, d MMMM',
        xScrollbar: true
      };

      let chart_kw_props = {
        element: 'chartKiloWatt',
        data: kw_data,
        title: 'KILOWATT',
        interval: {
          'interval': 'minute',
          'value': 5
        },
        tooltipFormat: 'HH:mm:ss, d MMMM',
        xScrollbar: true
      };

      let chart_pf_props = {
        element: 'chartPowerFactor',
        data: pf_data,
        title: 'POWER FACTOR',
        interval: {
          'interval': 'minute',
          'value': 5
        },
        tooltipFormat: 'HH:mm:ss, d MMMM',
        xScrollbar: false
      };

      this.implementChart(chart_vol_props);
      this.implementChart(chart_curr_props);
      this.implementChart(chart_kw_props);
      this.implementChart(chart_pf_props);

    });

  }

  implementChart(data) {

    am4core.useTheme(am4themes_animated);

    if (this.chart) {
      this.chart.dispose();
    }

    let chart = am4core.create(data.element, am4charts.XYChart);
    chart.paddingRight = 20;

    chart.data = data.data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    dateAxis.baseInterval = {
      'timeUnit': data.interval.interval,
      'count': data.interval.value
    };

    dateAxis.tooltipDateFormat = data.tooltipFormat;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.text = data.title;
    // valueAxis.min = 0;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'visits';
    series.tooltipText = 'Visits: [bold]{valueY}[/]';
    series.fillOpacity = 0;
    series.strokeWidth = 1;
    // series.stroke = am4core.color("#CDA2AB");

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.opacity = 0;

    /* if(data.xScrollbar) {
      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      // scrollbarX.scrollbarChart.seriesContainer.hide();
      chart.scrollbarX = scrollbarX;
    } */

    dateAxis.start = 0;
    dateAxis.keepSelection = true;
    /* chart.svgContainer.autoResize = false;
    chart.svgContainer.measure(); */

  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
