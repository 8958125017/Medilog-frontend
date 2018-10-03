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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(HospitalRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
                 HospitalDashboardComponent,
                 ProfileComponent,
                 HospitalDashboardComponent, 
                 AdddoctorComponent,
                 AddpharmacyComponent,
                 AddlabsComponent,
                 ViewdoctorsComponent,
                 ViewpharmacyComponent,
                 ViewlabsComponent
  ]
})
export class HospitalModule { }
