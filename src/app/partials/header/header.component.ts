import { Component, OnInit } from '@angular/core';
import { EmitterService } from 'src/app/shared/services/event-service';
import { LoginService } from 'src/app/shared/services/login.service';
import{ ThemeHeader } from '../../common';

@Component({
  selector: 'zainergy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: LoginService, private eventEmitter: EmitterService) { }

  profile = ThemeHeader.profile
  profile_url = ThemeHeader.profile_url
  logout = ThemeHeader.logout
  public user: any;
  public device_status = 'Online';
  public device_class = 'device-default';
  public last_received = '00:00:00';

  ngOnInit(): void {    
    this.currentUser();
    this.eventEmitter.listen('deviceStatus', (data) => {      
      this.deviceStatus(data);
    });
  }  

  currentUser() {
    this.authService.getUser().subscribe((res: any) => {
      if (res?.data || res?.user) {
        this.user = (res.data) ? res.data: res.user;
      }
    })
  }

  deviceStatus(data) {
    this.device_class = ( data.device_status === true ? 'device-active' : 'device-warning' );
    this.last_received = data.timestamp;
  }

  signOut() {
    this.authService.logout()
  }

}
