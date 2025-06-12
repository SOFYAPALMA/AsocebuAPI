import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';  
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { TareasService } from '../../Services/tareas.service';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './crear-tarea.component.html',
  styleUrl: './crear-tarea.component.css'
})
export class CrearTareaComponent implements OnInit{
  subscription: Subscription = new Subscription();

  submitted = false;
  loading = false;
  error = '';
  hide = true;  
  authForm!: UntypedFormGroup;
  successMessage = '';

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private tareasService: TareasService,   
    ){}

    ngOnInit(): void { 
    this.authForm = this.formBuilder.group({
      actividad: ['', Validators.required],
      fechaCierre: ['',],
        
    });  
  }

   get f() { return this.authForm.controls; }

   onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    this.successMessage = '';

   
    if (this.authForm.invalid) {
      this.error = 'Error en la creacion de nueva tarea';
      this.loading = false;
      this.successMessage = 'Tarea creada con éxito';
      return;
    } else {  
      this.tareasService.nuevaTarea(this.authForm.value).subscribe({
        next: (response: any) => {
       
          this.router.navigate(['tareas']);
        },
        error: () => {
          this.error = 'Error al crear nueva tarea';
          this.loading = false;
        }
      });   
    }
  }

}
