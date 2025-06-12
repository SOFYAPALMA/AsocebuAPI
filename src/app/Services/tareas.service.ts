import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { RespuestaAPI } from '../Models/RespuestaAPI';
import { catchError, Observable, throwError } from 'rxjs';
import { Tareas } from '../Models/Tareas';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  actualizar(tareaActualizada: { estado: boolean; fechaCierre: string | null; idTarea: number; actividad: string; fechaApertura: Date; }) {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'Tareas/';

  constructor() { }

    // metodo para solicitud tipo Get que trae la lista de tareas
   lista(){
    return this.http.get<RespuestaAPI>(this.apiUrl + "ConsultarTareas");
  }

  //metodo para la consulta por id de tareas
   obtener(id: string): Observable<RespuestaAPI> {
    console.log('gg', id);
    return this.http.get<RespuestaAPI>(
      this.apiUrl + "ConsultarTareaId?id=" + id
    ).pipe(
      catchError(error => {
        console.error('Error al obtener Tarea:', error);
        return throwError(() => error);
      })
    );
  }

  //metodo tipo post para crear Tarea
    nuevaTarea(value: Tareas): Observable<RespuestaAPI> {
    console.log('nuevo tarea', value);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<RespuestaAPI>(
      `${this.apiUrl}CrearTarea`,
      value,
      httpOptions
    );
  }
    //metodo tipo put para editar Tarea
    editarProducto(objeto: Tareas): Observable<RespuestaAPI> {
      return this.http.put<RespuestaAPI>(
        `${this.apiUrl}ActualizarTarea`,
        objeto
      );
    }
  
    //metodo para la eliminar por id de tarea
    eliminar(id: string): Observable<RespuestaAPI> {
      return this.http.delete<RespuestaAPI>(`${this.apiUrl}EliminarTareaId?id=${id}`).pipe(
        catchError(error => {
          console.error('Error al eliminar Tarea:', error);
          return throwError(() => error);
        })
      );
    }
  }  
