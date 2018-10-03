import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { DoctorSidebarComponent } from './doctorsidebar/doctorsidebar.component';
import { HospitalSidebarComponent } from './hospitalsidebar/hospitalsidebar.component';
import { PatientSidebarComponent } from './patientsidebar/patientsidebar.component';
import { LabSidebarComponent } from './labsidebar/labsidebar.component';
import { PharmacySidebarComponent } from './pharmacysidebar/pharmacysidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientsNavbarComponent } from './patientsnavbar/patientsnavbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HospitalSidebarComponent,
    PatientSidebarComponent,
    DoctorSidebarComponent,
    LabSidebarComponent,
    PatientsNavbarComponent,
    PharmacySidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HospitalSidebarComponent,
    PatientSidebarComponent,
    DoctorSidebarComponent,
    LabSidebarComponent,
    PatientsNavbarComponent,
    PharmacySidebarComponent
  ]
})
export class ComponentsModule { }
