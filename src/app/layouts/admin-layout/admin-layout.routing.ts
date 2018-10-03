import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { SettingsComponent } from '../../settings/settings.component';
import { AuthGuardService} from '../../auth-guard.service';

// import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';

import { PatientsComponent } from './patients/patients.component';
import { DoctorsComponent } from './doctors/doctors.component';

import { PendingpatientComponent } from './pendingpatient/pendingpatient.component';
import { PendingdoctorComponent } from './pendingdoctor/pendingdoctor.component';

import { HospitalsComponent } from './hospitals/hospitals.component';
import { PendinghospitalComponent } from './pendinghospital/pendinghospital.component';
import { LabsComponent } from './labs/labs.component';
import { PendinglabsComponent } from './pendinglabs/pendinglabs.component';
import { PendingpharmacyComponent } from './pendingpharmacy/pendingpharmacy.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';

export const AdminLayoutRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[AuthGuardService]
    }]
    },
    {
    path: '',
    children: [ {
      path: 'patients',
      component: PatientsComponent,
      canActivate:[AuthGuardService]
    }]
    }, {
      path: '',
      children: [ {
        path: 'doctors',
        component: DoctorsComponent,
        canActivate:[AuthGuardService]
        }]
    }, 
    {
        path: '',
        children: [ {
            path: 'pendingpatient',
            component: PendingpatientComponent,
            canActivate:[AuthGuardService]
        }]
    }, {
        path: '',
        children: [ {
            path: 'pendingdoctors',
            component: PendingdoctorComponent,
            canActivate:[AuthGuardService]
        }]
    }, 
    {
        path: '',
        children: [ {
            path: 'hospitals',
            component: HospitalsComponent,
            canActivate:[AuthGuardService]
        }]
    }, {
        path: '',
        children: [ {
            path: 'pendinghospitals',
            component: PendinghospitalComponent,
            canActivate:[AuthGuardService]
        }]
    },{
        path: '',
        children: [ {
            path: 'pendinglabs',
            component: PendinglabsComponent,
            canActivate:[AuthGuardService]
        }]
    },
    {
        path: '',
        children: [ {
            path: 'labs',
            component: LabsComponent,
            canActivate:[AuthGuardService]
        }]
    }, 

 

{
        path: '',
        children: [ {
            path: 'pharmacy',
            component: PharmacyComponent,
            canActivate:[AuthGuardService]
        }]
    }, 

{
        path: '',
        children: [ {
            path: 'pendingpharmacy',
            component: PendingpharmacyComponent,
            canActivate:[AuthGuardService]
        }]
    }, 

    // { path: '',pathMatch : 'full',redirectTo: 'dashboard' },
    // { path: 'dashboard',      component: DashboardComponent},    
    // { path: 'user-profile',   component: UserProfileComponent },    

];
