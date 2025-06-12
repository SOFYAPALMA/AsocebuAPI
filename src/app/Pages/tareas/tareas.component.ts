import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { RespuestaAPI } from '../../Models/RespuestaAPI';
import { query } from '@angular/animations';
import { TareasService } from '../../Services/tareas.service';
import { Tareas } from '../../Models/Tareas';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent implements OnInit, AfterViewInit {

private tareasServicio = inject(TareasService);
public listaTareas: MatTableDataSource<Tareas> =
new MatTableDataSource<Tareas>();
public displayedColumns: string[] = [
  'actividad',
  'estado',
  'fechaApertura',
  'fechaCierre',
  'accion',
];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  tarea: any;

    constructor(private router: Router, private dialog: MatDialog) {}

 ngAfterViewInit() {
    if (this.paginator) {
      this.listaTareas.paginator = this.paginator;
    }
    if (this.sort) {
      this.listaTareas.sort = this.sort;
    }
  }

   ngOnInit() {
    this.obtenerTareas();
  }

   obtenerTareas() {
    this.tareasServicio.lista().subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if (respuesta.success && respuesta.data) {
          this.listaTareas.data = respuesta.data;
        }
      },
      error: (err) => {
        console.error('Error al obtener tareas:', err);
      },
    });
  }

  ver(name: string) {
    console.log('id',name);
    this.router.navigate(['editar-tarea'], { queryParams: { id: name } });
  }

  nuevaTarea() {
    this.router.navigate(['crear-tarea']);
}

  eliminar(id: string) {
    console.log('id');
    console.log('LLAMAREDITAR');
    if (confirm(`¿Desea eliminar la tarea?`)) {
      this.tareasServicio.eliminar(id).subscribe({
        next: (respuesta: RespuestaAPI) => {
          console.log(respuesta);
          if (respuesta.success) {
            this.obtenerTareas();
          } else {
            alert(respuesta.message || 'No se pudo eliminar la tarea');
          }
        },
        error: (err) => {
          console.error(err);
          alert(
            'Error en la solicitud: ' + (err.error?.message || err.message)
          );
        },
      });
    }
  }


}
