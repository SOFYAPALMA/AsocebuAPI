import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../Services/login.service';


@Injectable({
  providedIn: 'root',
})

export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {
    console.log("ctor guard");
   }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("canActivate guard");
    console.log("state", state.url);

    if (state.url.startsWith('/login')) {
      return true;
    }

    const token = localStorage.getItem('user');
    if (token && Object.keys(token).length > 0) {
      return true;
    }

    this.router.navigate(['/login']);
    console.log("Usuario No autenticado");
    return false;
  }
}
