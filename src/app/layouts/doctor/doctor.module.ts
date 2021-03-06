import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorRoutes } from './doctor.routing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ViewpatientComponent } from './viewpatient/viewpatient.component';
import { DoctorrequestComponent } from './doctorrequest/doctorrequest.component';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { CreateprescriptionComponent } from './createprescription/createprescription.component';
import { RecordreviewComponent } from './recordreview/recordreview.component';
import { ProfileComponent } from './profile/profile.component';
import { SeeEHRComponent } from './see-ehr/see-ehr.component';
import { Safe } from '../../html.pipe';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { Ng4LoadingSpinnerModule,Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DoctorRoutes),
    Ng4LoadingSpinnerModule.forRoot(),
    NgxPaginationModule,
    ChartsModule
  ],
  declarations: [
  	ViewpatientComponent,
  	DoctorrequestComponent,
  	AddpatientComponent,
  	CreateprescriptionComponent,
  	RecordreviewComponent,
  	ProfileComponent,
  	SeeEHRComponent,
    Safe,
    UpdatepasswordComponent,
    DashboardComponent
  ],
  providers: [Ng4LoadingSpinnerService],
})
export class DoctorModule { }
