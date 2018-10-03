import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { SettingsComponent } from '../../settings/settings.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';

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


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    QRCodeModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    SettingsComponent,
    PatientsComponent,
    DoctorsComponent,
    PendingpatientComponent,
    PendingdoctorComponent,
    HospitalsComponent,
    PendinghospitalComponent,
    LabsComponent,
    PendinglabsComponent,
    PendingpharmacyComponent,
    PharmacyComponent,
    // AdminLayoutComponent,
  ],
  // exports : [AdminLayoutComponent]
})

export class AdminLayoutModule {}
