import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { SettingsComponent } from '../../settings/settings.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { Ng4LoadingSpinnerModule,Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

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
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';

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
    Ng4LoadingSpinnerModule.forRoot(),
    NgxPaginationModule
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
    UpdatepasswordComponent,
  ],
  // exports : [AdminLayoutComponent]
})

export class AdminLayoutModule {}
