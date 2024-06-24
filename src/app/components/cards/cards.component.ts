import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { EmitterService } from 'src/app/shared/services/event-service';

@Component({
  selector: 'zainergy-dashboard-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() for: any;

  public device_id: any;

  public cards: any = [];

  public avg_vl_pn: any = 0.00;
  public avg_curr_3p: any = 0.00;
  public kw_now: any = 0.00;
  public frequency: any = 0.00;
  public avg_pf_3p: any = 0.00;
  public card_interval: number;

  constructor(private dashboardService: DashboardService, private eventEmitter: EmitterService) { }

  ngOnInit(): void {        
    console.log(this.for);
    this.fillCards();

    this.eventEmitter.listen('getSelectedSingleDevice', (device_id) => {
      this.device_id = device_id;
      this.selectedDeviceKPI();
    });

    // run in every 20 seconds
    this.card_interval =+ setInterval(() => {  
      this.selectedDeviceKPI(false);
    }, 20000);

  }
  
  fillCards() {
    this.cards = [
      {
        'key': 'Voltage',
        'value': this.avg_vl_pn,
      },
      {
        'key': 'Current',
        'value': this.avg_curr_3p,
      },
      {
        'key': 'Kw (now)',
        'value': this.kw_now,
      },
      {
        'key': 'Frequency',
        'value': this.frequency,
      },
      {
        'key': 'Power Factor',
        'value': this.avg_pf_3p,
      }
    ]
  }

  selectedDeviceKPI(reset = true) {

    if(reset) this.resetDeviceKpi();

    let parameters = ['avg_vl_pn', 'avg_curr_3p', 'total_w', 'frequency', 'avg_pf_3p'];

    let body = {
      'action': 'getLatestStatsByDevice',
      'user_id': localStorage.getItem('user'),
      'device_id': this.device_id,
      'parameters': parameters,
      'status': true
    };

    this.dashboardService.httpPost(body).subscribe((res: any) => {

      if (res.status == 200 && res.data.timestamp) {

        this.cards[0].value = res.data.avg_vl_pn.toFixed(2);
        this.cards[1].value = res.data.avg_curr_3p.toFixed(2);
        this.cards[2].value = res.data.total_w.toFixed(2);
        this.cards[3].value = res.data.frequency.toFixed(2);
        this.cards[4].value = res.data.avg_pf_3p.toFixed(2);
        
        if( 'device_status' in res.data ) {          
          this.eventEmitter.emit('deviceStatus', res.data);
        }

      }

    });

  }

  resetDeviceKpi() {
    this.cards[0].value = this.cards[1].value = this.cards[2].value = this.cards[3].value = this.cards[4].value =  0.00;
  }

  ngOnDestroy() {
    if (this.card_interval) {      
      clearInterval(this.card_interval);
    }
  }
}
