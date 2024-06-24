import { Component, OnInit } from '@angular/core';
import { ThemeSideBar } from '../../common';
import { Router } from '@angular/router';
import { EmitterService } from 'src/app/shared/services/event-service';

@Component({
  selector: 'zainergy-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss']
})
export class MainSidebarComponent implements OnInit {

  constructor(private router: Router, private eventEmitter: EmitterService) { }

  public menu_list: any[] = [];
  public main_logo = 'assets/images/Zainergy-logo.svg';
  public active_menu: String = '';
  public active_child_menu: String = '';
  // public sidebar_menu_hierarchy: any;
  
  ngOnInit(): void {
    this.sideBarMenu();
  }

  sideBarMenu() {
    this.menu_list = [
      {
        "key": ThemeSideBar.dashboardKey,
        "name": ThemeSideBar.dashboardValue,
        "url": ThemeSideBar.dashboardUrl,
        "icon": ThemeSideBar.dashboardIcon,
        "childrens": [{
          "key": ThemeSideBar.dashboardSingleKey,
          "name": ThemeSideBar.dashboardSingleValue,
          "url": ThemeSideBar.dashboardSingleUrl
        },
        {
          "key": ThemeSideBar.dashboardCollectiveKey,
          "name": ThemeSideBar.dashboardCollectiveValue,
          "url": ThemeSideBar.dashboardCollectiveUrl
        },
        {
          "key": ThemeSideBar.dashboardComparativeKey,
          "name": ThemeSideBar.dashboardComparativeValue,
          "url": ThemeSideBar.dashboardComparativeUrl
        }]
      },
      {
        "key": ThemeSideBar.analyticsKey,
        "name": ThemeSideBar.analyticsValue,
        "url": ThemeSideBar.analyticsUrl,
        "icon": ThemeSideBar.analyticsIcon,
        "childrens": [{
          "key": ThemeSideBar.analysisEnergyKey,
          "name": ThemeSideBar.analysisEnergyValue,
          "url": ThemeSideBar.analysisEnergyUrl,
          "icon": ThemeSideBar.analyticsIcon,
          "childrens": [{
            "key": ThemeSideBar.analysisEnergySingleKey,
            "name": ThemeSideBar.analysisEnergySingleValue,
            "url": ThemeSideBar.analysisEnergySingleUrl
          },
          {
            "key": ThemeSideBar.analysisEnergyCollectiveKey,
            "name": ThemeSideBar.analysisEnergyCollectiveValue,
            "url": ThemeSideBar.analysisEnergyCollectiveUrl
          },
          {
            "key": ThemeSideBar.analysisEnergyComparativeKey,
            "name": ThemeSideBar.analysisEnergyComparativeValue,
            "url": ThemeSideBar.analysisEnergyComparativeUrl
          }]
        },
        {
          "key": ThemeSideBar.analysisPowerKey,
          "name": ThemeSideBar.analysisPowerValue,
          "url": ThemeSideBar.analysisPowerUrl
        },
        {
          "key": ThemeSideBar.analysisHeatMapKey,
          "name": ThemeSideBar.analysisHeatMapValue,
          "url": ThemeSideBar.analysisHeatMapUrl
        },
        {
          "key": ThemeSideBar.analysisShareKey,
          "name": ThemeSideBar.analysisShareValue,
          "url": ThemeSideBar.analysisShareUrl
        },
        {
          "key": ThemeSideBar.analysisMinMaxKey,
          "name": ThemeSideBar.analysisMinMaxValue,
          "url": ThemeSideBar.analysisMinMaxUrl
        }]
      },
      {
        "key": ThemeSideBar.statusKey,
        "name": ThemeSideBar.statusValue,
        "url": ThemeSideBar.statusUrl,
        "icon": ThemeSideBar.statusIcon,
        "arrow": false,
      },
      {
        "key": ThemeSideBar.alarmKey,
        "name": ThemeSideBar.alarmValue,
        "url": ThemeSideBar.alarmUrl,
        "icon": ThemeSideBar.alarmIcon,
        "arrow": false,
      },
      {
        "key": ThemeSideBar.favoriteKey,
        "name": ThemeSideBar.favoriteValue,
        "url": ThemeSideBar.favoriteUrl,
        "icon": ThemeSideBar.favoriteIcon,
        "arrow": false,
      },
      {
        "key": ThemeSideBar.settingsKey,
        "name": ThemeSideBar.settingsValue,
        "url": ThemeSideBar.settingsUrl,
        "icon": ThemeSideBar.settingsIcon,
        "arrow": false,
      }
    ];    
  }

  activeMenuClass(menu) {
    
    let hide_panel_menu = ['status', 'alarm-logs', 'favorite', 'settings'];
    let status = hide_panel_menu.indexOf(menu) > -1;    
    this.eventEmitter.emit('menuFromPanelControl', status);

    this.active_menu = this.router.url.includes(menu) ? menu : '';
  }

  activeChildMenuClass(child_menu) {    
    this.active_child_menu = this.router.url.includes(child_menu) ? child_menu : '';
  }

}
