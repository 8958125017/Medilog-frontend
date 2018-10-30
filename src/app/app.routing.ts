import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { PatientComponent } from './layouts/patient/patient.component';
import { DoctorComponent } from './layouts/doctor/doctor.component';
import { LabsComponent } from './layouts/labs/labs.component'
import { GlobalServiceService} from './global-service.service';
import { AuthGuardService}from'./auth-guard.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HospitalComponent} from './layouts/hospital/hospital.component';
import { PharmacyComponent} from './layouts/pharmacy/pharmacy.component';
import { SignupComponent } from './signup/signup.component';
import { UpdatepasswordComponent } from './updatePassword/updatePassword.component';
const routes: Routes =[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },{
    path: 'home',
    component: HomeComponent,
  },{
    path: 'login',
    component: LoginComponent,
  },{
    path: 'signup',
    component: SignupComponent,
  },{
    path: 'updatePassword/:token',
    component: UpdatepasswordComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      // canActivate: [AuthGuardService]
  },
  {
    path: 'patient',
    component: PatientComponent,
    loadChildren: './layouts/patient/patient.module#PatientModule',
     // canActivate: [AuthGuardService]
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    loadChildren: './layouts/doctor/doctor.module#DoctorModule',
     // canActivate: [AuthGuardService]
  },
  {
    path:'labs',
    component:LabsComponent,
    loadChildren:'./layouts/labs/labs.module#LabsModule',
      //canActivate: [AuthGuardService]
  },
  {
    path:'hospital',
    component:HospitalComponent,
    loadChildren:'./layouts/hospital/hospital.module#HospitalModule',
     // canActivate: [AuthGuardService]
  },
  {
    path:'pharmacy',
    component:PharmacyComponent,
    loadChildren:'./layouts/pharmacy/pharmacy.module#PharmacyModule',
     // canActivate: [AuthGuardService]
  }
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
// export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });