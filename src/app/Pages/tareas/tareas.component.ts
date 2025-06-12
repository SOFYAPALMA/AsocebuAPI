import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { CommonModule } from '@angular/common';
import { RespuestaAPI } from '../../Models/RespuestaAPI';
import { query } from '@angular/animations';
import { TareasService } from '../../Services/tareas.service';
import { Tareas } from '../../Models/Tareas';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
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

  constructor(private router: Router, private dialog: MatDialog, snackBar: MatSnackBar) {}

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

  confirmarTerminar(tarea: Tareas) {
  if (confirm('¿Confirmas que esta tarea ha sido terminada?')) {
    const tareaActualizada: Tareas = {
      ...tarea,
      estado: true,
      fechaCierre: new Date(), // establece la fecha de cierre actual
    };

    this.tareasServicio.editarProducto(tareaActualizada).subscribe({
      next: (respuesta) => {
        if (respuesta.success) {
          this.obtenerTareas();
        } else {
          alert(respuesta.message || 'No se pudo actualizar la tarea');
        }
      },
      error: (err) => {
        console.error('Error al actualizar la tarea:', err);
        alert('Error en la solicitud: ' + (err.error?.message || err.message));
      },
    });
  }
}

  nuevaTarea() {
    this.router.navigate(['crear-tarea']);
}

  eliminar(idTarea: string) {
    console.log('id');
    console.log('LLAMAREDITAR');
    if (confirm(`¿Desea eliminar la tarea?`)) {
      this.tareasServicio.eliminar(idTarea).subscribe({
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

  salir() {
  if (confirm('¿Estás seguro de que deseas salir?')) {
    this.router.navigate(['login']); 
  }
}
}
