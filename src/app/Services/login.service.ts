import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { Login } from '../Models/Login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { appsettings } from '../Settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${appsettings.apiUrl}Usuario/ValidarLogin`;
  private currentUser: any = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) {

    console.log("ctr auth service Service");
    this.loadCurrentUser();
  }
  private loadCurrentUser(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  iniciarSesion(usuario: Login): Observable<RespuestaAPI> {
    console.log(' auth 1', usuario);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return new Observable((subscriber) => {
      this.httpClient
        .post<RespuestaAPI>(
          this.API_URL, usuario,
          {}
        )
        .subscribe((data) => {
          //some stuff
          console.log('auth service', data);
          subscriber.next(data);
        });
    });
  } 
  
  logout() {    
    // Notificación
    this.snackBar.open('Sesión cerrada correctamente', 'Cerrar', {
      duration: 3000
    });
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}


