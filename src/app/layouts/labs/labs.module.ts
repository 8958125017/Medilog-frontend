import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LabsRoutes } from './labs.routing'
import { LabsDashboardComponent } from './labs-dashboard/labs-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadbillComponent } from './uploadbill/uploadbill.component';
import { ReportComponent } from './report/report.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { Ng4LoadingSpinnerModule,Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule,
    RouterModule.forChild(LabsRoutes),
    Ng4LoadingSpinnerModule.forRoot(),
    NgxPaginationModule
  ],
  declarations: [
                  LabsDashboardComponent,
                  ProfileComponent,
                  UploadbillComponent,
                  ReportComponent,
                  UpdatepasswordComponent
                ],
                providers: [Ng4LoadingSpinnerService],
})
export class LabsModule { }
