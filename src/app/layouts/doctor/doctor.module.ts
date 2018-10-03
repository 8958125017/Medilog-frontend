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
import { HtmlPipe } from '../../html.pipe';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { Ng4LoadingSpinnerModule,Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DoctorRoutes),
    Ng4LoadingSpinnerModule.forRoot(),
    NgxPaginationModule
  ],
  declarations: [
  	ViewpatientComponent,
  	DoctorrequestComponent,
  	AddpatientComponent,
  	CreateprescriptionComponent,
  	RecordreviewComponent,
  	ProfileComponent,
  	SeeEHRComponent,
    HtmlPipe,
    UpdatepasswordComponent
  ],
  providers: [Ng4LoadingSpinnerService],
})
export class DoctorModule { }
