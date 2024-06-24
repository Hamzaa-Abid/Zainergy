import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: LoginService ) {}

  canActivate() {
      if (this.authService.loggedIn()) {
          return true;
      }
      else{
        this.router.navigate(['/login']);
      }
  }
  
}
