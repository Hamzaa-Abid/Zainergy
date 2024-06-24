import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/services/dashboard.service';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { ChartDataSets, ChartOptions } from 'chart.js';
// import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-demo-dashboard',
  templateUrl: './demo-dashboard.component.html',
  styleUrls: ['./demo-dashboard.component.scss']
})
export class DemoDashboardComponent implements OnInit {

  data: any = [{
    buckets: [
      {
        date_agg: [
          {
            avg_hum: { value: 34.51593625498008 },
            avg_temp: { value: 32.004980079681275 },
            doc_count: 2008,
            key: 1597604400000,
            key_as_string: "2020-08-17T00:00:00.000+05:00",
            max_hum: { value: 45 },
            max_temp: { value: 33 },
            min_hum: { value: 32 },
            min_temp: { value: 26 }
          },
          {
            avg_hum: { value: 34.13879598662207 },
            avg_temp: { value: 33.19565217391305 },
            doc_count: 1196,
            key: 1597690800000,
            key_as_string: "2020-08-18T00:00:00.000+05:00",
            max_hum: { value: 41 },
            max_temp: { value: 35 },
            min_hum: { value: 31 },
            min_temp: { value: 27 }
          },
          {
            avg_hum: { value: 35.11457627118644 },
            avg_temp: { value: 31.107118644067796 },
            doc_count: 1475,
            key: 1597777200000,
            key_as_string: "2020-08-19T00:00:00.000+05:00",
            max_hum: { value: 58 },
            max_temp: { value: 34 },
            min_hum: { value: 31 },
            min_temp: { value: 26 },
          },
          {
            avg_hum: { value: 36.14861751152074 },
            avg_temp: { value: 30.97119815668203 },
            doc_count: 868,
            key: 1597863600000,
            key_as_string: "2020-08-20T00:00:00.000+05:00",
            max_hum: { value: 58 },
            max_temp: { value: 37 },
            min_hum: { value: 30 },
            min_temp: { value: 25 },
          },
        ]
      }, {

        date_agg: [
          {
            avg_hum: { value: 34.51593625498008 },
            avg_temp: { value: 32.004980079681275 },
            doc_count: 2008,
            key: 1597604400000,
            key_as_string: "2020-08-17T00:00:00.000+05:00",
            max_hum: { value: 45 },
            max_temp: { value: 33 },
            min_hum: { value: 32 },
            min_temp: { value: 26 }
          }, {
            avg_hum: { value: 34.13879598662207 },
            avg_temp: { value: 33.19565217391305 },
            doc_count: 1196,
            key: 1597690800000,
            key_as_string: "2020-08-18T00:00:00.000+05:00",
            max_hum: { value: 41 },
            max_temp: { value: 35 },
            min_hum: { value: 31 },
            min_temp: { value: 27 },
          }, {
            avg_hum: { value: 35.11457627118644 },
            avg_temp: { value: 31.107118644067796 },
            doc_count: 1475,
            key: 1597777200000,
            key_as_string: "2020-08-19T00:00:00.000+05:00",
            max_hum: { value: 58 },
            max_temp: { value: 34 },
            min_hum: { value: 31 },
            min_temp: { value: 26 },
          },
          {
            avg_hum: { value: 36.14861751152074 },
            avg_temp: { value: 30.97119815668203 },
            doc_count: 868,
            key: 1597863600000,
            key_as_string: "2020-08-20T00:00:00.000+05:00",
            max_hum: { value: 58 },
            max_temp: { value: 37 },
            min_hum: { value: 30 },
            min_temp: { value: 25 },
          }
        ]
      }
    ]
  }]

  labeldata = [


    { data: [], label: 'DHT11 minTemp' },
    { data: [], label: 'DHT11 maxTemp' },
    { data: [], label: 'DHT11 avgTemp' },
    { data: [], label: 'DHT11 maxHum' },
    { data: [], label: 'DHT11 minHum' },
    { data: [], label: 'DHT11 avgHum' },
    { data: [], label: 'DHT12 minTemp' },
    { data: [], label: 'DHT12 maxTemp' },
    { data: [], label: 'DHT12 avgTemp' },
    { data: [], label: 'DHT12 maxHum' },
    { data: [], label: 'DHT12 minHum' },
    { data: [], label: 'DHT12 avgHum' }


  ]
  deviceCordinates: any;
  markers: any[];
  noOfDevices: any;
  getMap = false
  center = { lat: 24.860966, lng: 66.990501 };
  markerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 9;
  display?: google.maps.LatLngLiteral;
  getDevicesDetail = [];
  lineChartData: ChartDataSets[]
  // lineChartLabels: Label[]
  id: any = 'monthly'
  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        // stacked: true,
        ticks: {
          fontColor: 'black',
        }
      }],
      yAxes: [{
        // stacked: true,
        ticks: {
          fontColor: 'black',
        },
        scaleLabel: {
          display: true,
          labelString: 'Temprature',
          fontColor: 'black',
        }

      }],
    },
    legend: {
      position: 'bottom',
      display: true,

      labels: {
        fontColor: 'black',
      },
    }
  };

  comparisionData = [


    {
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90], label: 'temprature'
    },
    {
      data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20], label: 'humidity',
    }
    // { data: [100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100], label: 'current'}

  ]


  // lineChartColors: Color[] = [];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType1 = 'line';
  lineChartType2 = 'bar';
  lineChartType3 = 'bar';
  filterArray = []
  deviceArray: any = [];
  combinedLabel: any = [];


  constructor(public dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getDashboardDetail()
    this.getLineGraph()
    this.getLatestStats()
    this.devicesConected()
    this.data[0].buckets[0].date_agg.forEach((i) => {
      this.labeldata[0].data.push(i.max_temp.value)
      this.labeldata[1].data.push(i.min_temp.value)
      this.labeldata[2].data.push(i.avg_temp.value)
      this.labeldata[3].data.push(i.max_hum.value)
      this.labeldata[4].data.push(i.min_hum.value)
      this.labeldata[5].data.push(i.avg_hum.value)

    })

    this.data[0].buckets[1].date_agg.forEach((i) => {
      this.labeldata[6].data.push(i.max_temp.value)
      this.labeldata[7].data.push(i.min_temp.value)
      this.labeldata[8].data.push(i.avg_temp.value)
      this.labeldata[9].data.push(i.max_hum.value)
      this.labeldata[10].data.push(i.min_hum.value)
      this.labeldata[11].data.push(i.avg_hum.value)
    })
    this.combinedLabel = ['Mon', 'Tue', 'Wed', 'Thurs']

  }

  getDashboardDetail() {
    let obj = {
      account_id: 1
    }

    this.dashboardService.getDevices(obj).subscribe((res: any) => {
      // this.getDevicesDetail = res
      this.deviceCordinates = res
      this.markers = []
      this.noOfDevices = this.deviceCordinates.devices.length
      this.deviceCordinates.devices.forEach((loc) => {
        this.markers.push({ lng: parseFloat(loc.location.lng), lat: parseFloat(loc.location.lat) })
      })
      this.getMap = true
    })
  }

  getLatestStats() {
    let data = {
      user_id: 1
    }
    this.dashboardService.getLatestStat(data).subscribe((res: any) => {
      this.getDevicesDetail = res.data
    })
  }

  devicesConected() {
    let data = {
      user_id: 1
    }
    this.dashboardService.getDivicesByAccount(data).subscribe((res: any) => {
      if (res.status == 200) {
        res.data.forEach((device) => {
          this.deviceArray.push(device.name)
        })
      }
    })
  }

  getLineGraph() {
    this.lineChartData = [

      {
        data: [64, 87, 78, 40, 88, 60, 70, 80, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90], label: 'min'
      },
      {
        data: [100, 90, 80, 70, 77, 50, 40, 65, 33, 20, 33, 20, 20, 20, 20, 20, 20, 20, 20, 20], label: 'max',
      },
      { data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], label: 'current' }

    ];

    // this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

}
