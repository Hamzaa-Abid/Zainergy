import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/services/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailId: any;
  password: any;
  showError = false;
  submitted = false;
  emailPrompt: boolean;
  passwordPrompt: boolean;
  forgotPassword = false
  emailRememberPrompt = false
  reqiureRegister = false


  constructor(private authService: LoginService) { }

  ngOnInit(): void {

  }

  validate() {
    if (!this.emailId) {
      this.emailPrompt = true
    }
    else {
      this.emailPrompt = false
    }
    if (!this.password) {
      this.passwordPrompt = true
    }
    else {
      this.passwordPrompt = false
    }
    return !this.passwordPrompt && !this.emailPrompt
  }

  login() {
    this.showError = false
    if (this.validate()) {
      let body = {
        email: this.emailId,
        password: this.password
      }

      this.authService.login(body).subscribe((res: any) => {
          /* if(res.data.user) {
            this.authService.getUserAccount();
          } */
      },
        error => {
          this.showError = true
        })
    }
  }
}
