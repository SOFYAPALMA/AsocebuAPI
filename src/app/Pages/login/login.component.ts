import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Services/login.service';
import { RespuestaAPI } from '../../Models/RespuestaAPI';
import { Usuario } from '../../Models/Usuario';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  subscription: Subscription = new Subscription();
  authForm!: UntypedFormGroup;
  usuario!: Usuario;

  submitted = false;
  loading = false;
  error = '';
  hide = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      Correo: ['', [Validators.required, Validators.email]],
      Clave: ['', Validators.required],
    });
  }

  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (this.authForm.invalid) {
      this.error = 'Estudiante y/o contraseña invalida';
      this.loading = false;
      return;
    } else {
      console.log('Datos enviados:', this.authForm.value);
      this.authService.iniciarSesion(this.authForm.value).subscribe({
        next: (response: RespuestaAPI) => {
          if (response.success) {
            //console.log('Login exitoso', response.data);
            this.usuario = JSON.parse(JSON.stringify(response.data));
            //console.log('Login exitoso 2', this.usuario.correo);
            localStorage.setItem('user', this.usuario.correo);
            this.router.navigate(['/tareas']);
          } else {
            this.error = 'Estudiante y/o contraseña incorrectos';
            this.loading = false;
          }
        },
        error: () => {
          this.error = 'Estudiante y/o contraseña incorrectos';
          this.loading = false;
        },
      });
    }
  }

  Ir() {
    console.log('Ir');
    this.router.navigate(['/tareas']);
  }

  Usuario(id: number) {
    this.router.navigate(['crear-usuario'], { queryParams: { id: id ?? '0' } });
  }

}
