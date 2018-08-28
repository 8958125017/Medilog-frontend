import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AuthGuard} from './auth-guard.service';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';


const routes: Routes =[
  {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'forgotpassword',
        component: ForgotpasswordComponent
    },
    {
      path :'updatepassword/:token',
      component: UpdatepasswordComponent
    },
   {
       path: 'dashboard',
       // canActivate : [AuthGuard],
       component: AdminLayoutComponent,
       children: [
        {
       path: '',
       loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }
 ]}

 ];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
