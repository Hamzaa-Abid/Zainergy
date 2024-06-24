import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import { LoginService } from '../services/login.service';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  deviceArray: any = []
  currentDevice: any = 'Dashboard';
  options = []
  route: string;

  constructor(private authService: LoginService, private router: Router) { }



  getDeviceName(event) {
    this.currentDevice = event.target.innerText
  }


  getSideBar() {

    this.options = [
      {
        name: 'Dashboard',
        route: '/dashboard',
        src: './assets/media/icons/Dashboard.svg'
      },
      {
        name: 'Devices',
        route: '/devices',
        src: './assets/media/icons/devices-white.svg'
      },
      {
        name: 'Compare Devices',
        route: '/devices/compare-devices',
        src: './assets/media/icons/devices-white.svg'
      },
      {
        name: 'Settings',
        route: '/settings',
        src: './assets/media/icons/settings.svg'
      },
      {
        name: 'Collective Dashboard',
        route: '/collective-dashboard',
        src: './assets/media/icons/settings.svg'
      }
    ]
    
    this.currentRoute()
  }
  currentRoute() {
    this.route = this.router.url
    this.options.forEach((i) => {
      if (this.route === i.route) {
        this.currentDevice = i.name
      }

    })

  }

  ngOnInit(): void {
    this.getSideBar()

  }
}
