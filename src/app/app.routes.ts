import { Resolve, ResolveFn, Routes } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RegisterComponent } from '../components/register/register.component';
import { LayoutComponent } from '../components/layout/layout.component';

const loginComponentTitle: ResolveFn<string> = () => 
  Promise.resolve('Login Component Starts');

export const routes: Routes = [
    {
      path:'',
      component:LayoutComponent,
    },
    {
        path:'login',
        loadComponent:()=>import('../components/login/login.component').then(m=>m.LoginComponent),
        // title:loginComponentTitle
        data:{ title: 'Heroes List' }
    },
    {
      path:'student-registration',
      component:RegisterComponent
    },
    {
      path:'dashboard',
      component:DashboardComponent
    }
];

