import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  first_name: any = "";
  last_name: any = "";
  email: any = "";
  company: any = "";
  constructor(private dashboardService: DashboardService, loginService: LoginService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.dashboardService.getProfile().subscribe((data: any) => {
      if(data.data){
        this.first_name = data.data.first_name
        this.last_name = data.data.last_name
        this.email = data.data.email
        this.company = data.data.company
      }
    }) 
  }
  postProfile() {
    let postobj = {};
    postobj = { first_name: this.first_name, last_name: this.last_name };
    this.dashboardService.postProfile(postobj).subscribe(data => {
    })
  }

  //Observabe to get logged in user details throuhout web
}
