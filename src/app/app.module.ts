import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AuthModule } from './auth/auth.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './shared/guard/auth.guard';
import { GoogleMapsModule } from '@angular/google-maps'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
import { DashboardModule } from './dashboard/dashboard.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DevicesModule } from './Devices/devices.module'
import { RouterModule } from '@angular/router';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { routes } from './app-routing.module';
import { LoaderComponent } from './shared/loader/loader.component'
import { LoaderInterceptor } from './shared/interceptor/loader.interceptor';
import { DemoDashboardComponent } from './demo-dashboard/demo-dashboard.component'
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthInterceptor} from './shared/interceptor/auth.interceptor';
import { IndivicualDeviceComponent } from './indivicual-device/indivicual-device.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { IndivicualDevicesComponent } from './indivicual-devices/indivicual-devices.component';
import { FiltersComponent } from './indivicual-devices/filters-component/filters-component';
import { IndivicualCardComponent } from './indivicual-devices/indivicual-card/indivicual-card.component';
import { GraphsComponent } from './indivicual-devices/graphs/graphs-component';
import { DataSharedService } from './shared/services/data-shared.service';
import { EmitterService } from './shared/services/event-service';
import { WidgetsModule } from './widgets/widgets.module'
// import { ChartsModule } from 'ng2-charts';
// import { GaugeModule } from 'angular-gauge';
import { ToastrModule } from 'ngx-toastr';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CollectiveDaschboardModule } from './collective-daschboard/collective-daschboard.module';
import { MasterComponent } from './layouts/master/master.component';
import { ControlPanelComponent } from './partials/control-panel/control-panel.component';
import { HeaderComponent } from './partials/header/header.component';
import { MainSidebarComponent } from './partials/main-sidebar/main-sidebar.component';
import { StatusComponent } from './status/status.component';
import { AlarmLogsComponent } from './alarm-logs/alarm-logs.component';
import { SettingsComponent } from './settings/settings.component';
import { RecursiveControlPanelComponent } from './components/recursive-control-panel/recursive-control-panel.component';
import { RecursiveSidebarMenuComponent } from './components/recursive-sidebar-menu/recursive-sidebar-menu.component';
import { FavoriteComponent } from './favorite/favorite.component';

@NgModule({
 
  declarations: [
    AppComponent,
    SidebarComponent,
    FullComponent,
    BlankComponent,
    LoaderComponent,
    DemoDashboardComponent,
    IndivicualDeviceComponent,
    IndivicualDevicesComponent,
    FiltersComponent,
    IndivicualCardComponent,
    GraphsComponent,
    ProfileComponent,
    MasterComponent,
    ControlPanelComponent,
    HeaderComponent,
    MainSidebarComponent,
    StatusComponent,
    AlarmLogsComponent,
    SettingsComponent,
    RecursiveControlPanelComponent,
    RecursiveSidebarMenuComponent,
    FavoriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    DevicesModule,
    HttpClientModule,
    GoogleMapsModule,
    FormsModule,
    CollectiveDaschboardModule,
    ReactiveFormsModule,    
    NgHttpLoaderModule.forRoot(),
    CommonModule,
    NgbModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    // ChartsModule,
    // GaugeModule.forRoot(),
    ToastrModule.forRoot(),
    WidgetsModule,
    ScrollingModule,
    AnalyticsModule,
  ],
  providers: [AuthGuard, DataSharedService, EmitterService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
