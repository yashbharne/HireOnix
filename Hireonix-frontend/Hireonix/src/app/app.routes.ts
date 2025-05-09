import { Routes } from '@angular/router';
 import { LoginComponent } from './features/login/login.component';
import { recruiterRoutes } from './features/recruiter/recuiter.routes';
// import  recruiterRoutes from '../app/features/recruiter/recuiter.routes'
// import { recruiterRoutes } from './features/recruiter/recuiter.routes';
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    },
    ...recruiterRoutes
];
