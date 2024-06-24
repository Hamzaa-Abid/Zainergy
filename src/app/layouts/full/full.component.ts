import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
declare var $: any;

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  name: string;
  resData: any = []
  constructor(private loginService: LoginService) { }

  signOut() {
    this.loginService.logout()
  }

  getUserName() {
    this.loginService.getUser().subscribe((res: any) => {
      if (res.user) {
        this.name = `${res.user.first_name}`
      }
      else {
        this.name = `${res.data.first_name}`
      }
    })
  }

  ngOnInit(): void {
    this.getUserName();
    
    $(document).ready(function() {
      $("body").removeClass(".mat-typography");
  });
  }

}
