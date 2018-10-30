import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HospitalRoutes } from './hospital.routing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HospitalDashboardComponent } from './hospital-dashboard/hospital-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AdddoctorComponent } from './adddoctor/adddoctor.component';
import { AddpharmacyComponent } from './addpharmacy/addpharmacy.component';
import { AddlabsComponent } from './addlabs/addlabs.component';
import { ViewdoctorsComponent } from './viewdoctors/viewdoctors.component';
import { ViewpharmacyComponent } from './viewpharmacy/viewpharmacy.component';
import { ViewlabsComponent } from './viewlabs/viewlabs.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { Ng4LoadingSpinnerModule,Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { ChartsModule } from 'ng2-charts';
import { ViewpatientComponent } from './viewpatient/viewpatient.component';
import { AddpatientComponent } from './addpatient/addpatient.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(HospitalRoutes),
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgxPaginationModule,
    ChartsModule
  ],
  declarations: [
                 HospitalDashboardComponent,
                 ProfileComponent,
                 HospitalDashboardComponent, 
                 AdddoctorComponent,
                 DoctorProfileComponent,
                 AddpharmacyComponent,
                 AddlabsComponent,
                 ViewdoctorsComponent,
                 ViewpharmacyComponent,
                 ViewlabsComponent,
                 UpdatepasswordComponent,
                 ViewpatientComponent,
                 AddpatientComponent
  ]
})
export class HospitalModule { }
