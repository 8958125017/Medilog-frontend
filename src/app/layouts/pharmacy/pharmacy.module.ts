import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyRoutes } from './pharmacy.routing';
import { RouterModule } from '@angular/router';
import { PharmacyDashboardComponent } from './pharmacy-dashboard/pharmacy-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadbillComponent } from './uploadbill/uploadbill.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { Ng4LoadingSpinnerModule,Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PharmacyRoutes),
    Ng4LoadingSpinnerModule.forRoot(),
    NgxPaginationModule,
    ChartsModule
  ],
  declarations: [PharmacyDashboardComponent, ProfileComponent, UploadbillComponent, UpdatepasswordComponent]
})
export class PharmacyModule { }
