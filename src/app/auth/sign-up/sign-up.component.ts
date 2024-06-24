import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  emailregister
  nameRegister
  passwordRegister
  confirmPassword
  emailRegisterPrompt: boolean;
  passwordRegisterPrompt: boolean;
  nameRegisterPrompt: boolean;
  confirmPasswordPrompt: boolean;
  passwordMatch: boolean;
  passwordLength: boolean;
  invalidEmail: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  validateSignIn(){
    if(!this.emailregister){
      this.emailRegisterPrompt = true
    }
    else{
      this.emailRegisterPrompt = false
    }
    if(!this.nameRegister){
      this.nameRegisterPrompt = true
    }
    else{
      this.nameRegisterPrompt = false
    }
    if(!this.passwordRegister){
      this.passwordRegisterPrompt = true
    }
    else{
      this.passwordRegisterPrompt = false
    }

    if( this.passwordRegisterPrompt == false &&  this.passwordRegister.length < 6 ){
      this.passwordLength = true
    }
    else{
      this.passwordLength = false
    }

    if(!this.confirmPassword){
      this.confirmPasswordPrompt = true
    }
    else{
      this.confirmPasswordPrompt = false
    }

    if(this.passwordRegister != this.confirmPassword && this.confirmPasswordPrompt == false && this.confirmPasswordPrompt == false && this.passwordLength == false){
      this.passwordMatch = true
    }
    else{
      this.passwordMatch = false
    }


    return !this.emailRegisterPrompt && !this.nameRegisterPrompt && !this.passwordRegisterPrompt && !this.confirmPasswordPrompt && !this.passwordMatch
  }

  registerUser(){
    if(this.validateSignIn()){}
    
  }

}
