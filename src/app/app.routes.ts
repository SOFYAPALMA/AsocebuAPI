import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginComponent } from './Pages/login/login.component';
import { TareasComponent } from './Pages/tareas/tareas.component';
import { EditarTareaComponent } from './Pages/editar-tarea/editar-tarea.component';
import { CrearUsuarioComponent } from './Pages/crear-usuario/crear-usuario.component';
import { CrearTareaComponent } from './Pages/crear-tarea/crear-tarea.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'crear-usuario', canActivate: [AuthGuard], component: CrearUsuarioComponent },
  { path: 'tareas', canActivate: [AuthGuard], component: TareasComponent },
  { path: 'crear-tarea', canActivate: [AuthGuard], component: CrearTareaComponent },
  { path: 'editar-tarea', canActivate: [AuthGuard], component: EditarTareaComponent },
  { path: 'login', component: LoginComponent },
];
