import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { DataSharedService } from "../../shared/services/data-shared.service";
import { DashboardService } from "../../shared/services/dashboard.service";
import { enFilter } from "../../shared/constant";

@Component({
    selector: 'app-energy-graph',
    templateUrl: './energy-graph-component.html'
})

export class EnergyGraphComponent implements OnInit {

    deviceService: number;
    deviceArray: any = [];
    paramDetail: any = [];
    deviceDetail: any = [];
    deviceType: any = []
    deviceInfo: any = [];
    showGauge: boolean = false;
    lineChartData = []
    filterArray = []
    graphData: any = [];
    getlabel: string = enFilter.today;
    fromDate: any;
    toDate: any;

    user_id: any;
    device_id: any;

    lineChartLegend = true;
    labelData: any = [];

    voltageChartOptions = {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    display: false,
                    beginAtZero: true,
                    max: 240
                }
            }],
        },
        animation: {
            duration: 0
        },
    }

    frequencyChartOptions = {
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    display: false,
                    beginAtZero: true,
                    max: 50
                }
            }],
        },
        animation: {
            duration: 0
        },
    }

    lineChartColors: Color[] = [
        {
            // grey
            borderColor: '#D32929',
            pointBackgroundColor: '#D32929',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#009efb'
        },
        {
            // dark grey
            borderColor: '#1C3FAA',
            pointBackgroundColor: '#1C3FAA',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#55ce63'
        },
        {
            // dark grey
            borderColor: '#FBC500',
            pointBackgroundColor: '#FBC500',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#55ce63',
        },
    ];

    graphParam: any = [];
    sensorData: any;
    current: any;
    power: any;

    constructor(private dataSharedService: DataSharedService, private dashboardService: DashboardService) { }

    ngOnInit(): void {
        this.paramDetail = this.dataSharedService.paramDetail;
        this.user_id = this.dataSharedService.user_id;
        this.device_id = this.dataSharedService.deviceDetail.device_id;
        this.getLineGraph();
    }

    getCurrentLabel(current) {
        return 'Current ' + current
    }
    getPowerLabel(power) {
        return 'Power ' + power
    }

    getGraphData() {
        this.labelData = [
            { data: [], label: 'voltage', minBarLength: 1, barThickness: 60, maxBarThickness: 100, },
            { data: [], label: 'frequency', minBarLength: 1, barThickness: 60, maxBarThickness: 100 },
        ];
        this.labelData[0].data.push(this.graphData.vl_rn);
        this.labelData[1].data.push(this.graphData.frequency);

        this.current = this.graphData.curr_r;
        this.power = this.graphData.pf_r;
        this.showGauge = true;
    }

    getGraphObj() {
        let paramArray = []
        this.paramDetail.forEach((param) => {
            paramArray.push(param.parameter)
        })
        let obj = {}
        this.getlabel = this.dataSharedService.getlabel
        if (this.getlabel == enFilter.selectFilter) {
            obj = {
                "user_id": [`${this.user_id}`],
                "device_id": this.device_id,
                "parameters": paramArray,
                "range": {
                    "from": `${this.dataSharedService.fromDate.year}-${('0' + this.dataSharedService.fromDate.month).slice(-2)}-${('0' + this.dataSharedService.fromDate.day).slice(-2)}`,
                    "to": `${this.dataSharedService.toDate.year}-${('0' + this.dataSharedService.toDate.month).slice(-2)}-${('0' + this.dataSharedService.toDate.day).slice(-2)}`
                },
            }

        } else {
            this.toDate = null
            this.fromDate = null
            obj =
            {
                "user_id": `${this.user_id}`,
                "device_id": `${this.device_id}`,
                "parameters": paramArray,
            }
        }
        return obj
    }

    getLineGraph() {
        this.filterArray = []
        this.lineChartData = []

        // get graph object
        let graphObj = this.getGraphObj()
        this.dashboardService.getLatestStatsByDevice(graphObj).subscribe((res: any) => {
            this.graphData = res.data
            this.getGraphData();
        })
    }

}