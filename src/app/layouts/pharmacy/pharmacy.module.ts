import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyRoutes } from './pharmacy.routing';
import { RouterModule } from '@angular/router';
import { PharmacyDashboardComponent } from './pharmacy-dashboard/pharmacy-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadbillComponent } from './uploadbill/uploadbill.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PharmacyRoutes),
  ],
  declarations: [PharmacyDashboardComponent, ProfileComponent, UploadbillComponent, UpdatepasswordComponent]
})
export class PharmacyModule { }
