import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Usuario } from '../Models/Usuario';
import { Observable } from 'rxjs';
import { RespuestaAPI } from '../Models/RespuestaAPI';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'Usuario/';

   constructor(private httpClient: HttpClient) {}

    nuevoUsuario(value: Usuario) : Observable<RespuestaAPI> {
    console.log(' nuevo 1', value);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return new Observable((subscriber) => {
      this.httpClient
        .post<RespuestaAPI>(
          this.apiUrl + 'CrearUsuario',
           value 
        )
        .subscribe((data: RespuestaAPI) => {
          
          console.log('user service', data);
          subscriber.next(data);
        });
    });
  }
}
