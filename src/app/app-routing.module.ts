import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { MasterComponent } from './layouts/master/master.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { DemoDashboardComponent } from './demo-dashboard/demo-dashboard.component';
import { IndivicualDeviceComponent } from './indivicual-device/indivicual-device.component';
import { IndivicualDevicesComponent } from './indivicual-devices/indivicual-devices.component';
import { StatusComponent } from './status/status.component';
import { AlarmLogsComponent } from './alarm-logs/alarm-logs.component';
import { SettingsComponent } from './settings/settings.component';
import { FavoriteComponent } from './favorite/favorite.component';

export const routes: Routes = [
  {
    path: '',
    // component: FullComponent,
    component: MasterComponent,
    children: [
      { path: '', redirectTo: 'dashboard/single', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module')
          .then(mod => mod.DashboardModule)
      },
      {
        path: 'analysis',        
        children: [
          {
            path: 'energy',
            loadChildren: () => import('./analytics/energy-consumption/energy-consumption.module')
              .then(mod => mod.EnergyConsumptionModule)
          }
        ],
        /* loadChildren: () => import('./analytics/analytics.module')
          .then(mod => mod.AnalyticsModule), */
      },
      {
        path: 'devices',
        loadChildren: () => import('./Devices/devices.module')
          .then(mod => mod.DevicesModule)
      },
      {
        path: 'collective-dashboard',
        loadChildren: () => import('./collective-daschboard/collective-daschboard.module')
          .then(mod => mod.CollectiveDaschboardModule)
      },
      {
        path: 'status',
        component: StatusComponent
      },
      {
        path: 'alarm-logs',
        component: AlarmLogsComponent
      },
      {
        path: 'favorite',
        component: FavoriteComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        // path: 'demo-dashboard',
        path: 'device/:deviceID',
        component: IndivicualDevicesComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'device/:deviceID',
        component: IndivicualDeviceComponent
      },
      {
        path: 'demo-dashoard',
        component: DemoDashboardComponent
      },
    ]
    , canActivate: [AuthGuard]
  },

  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'login',
        loadChildren: './auth/auth.module#AuthModule'
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
