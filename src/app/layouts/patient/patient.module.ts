import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientRoutes } from './patient.routing';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { AddOldRecordComponent } from './add-old-record/add-old-record.component';
import { EHRPullHistoryComponent } from './ehrpull-history/ehrpull-history.component';
import { HealthAnalysisComponent } from './health-analysis/health-analysis.component';
import { ConnectDeviceComponent } from './connect-device/connect-device.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

import { HtmlPipe,FilterPipe } from '../../html.pipe';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { DiscoverinsurenceComponent } from './discoverinsurence/discoverinsurence.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { SearchdoctorsComponent } from './searchdoctors/searchdoctors.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
// import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { Ng4LoadingSpinnerModule,Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(PatientRoutes),
    Ng4LoadingSpinnerModule,
    NgxPaginationModule,
    ChartsModule
  ],
  declarations: [  	
   	             PatientDashboardComponent,
   	             AddOldRecordComponent, 
   	             EHRPullHistoryComponent,
   	             HealthAnalysisComponent, 
   	             ConnectDeviceComponent,
   	             PatientProfileComponent,
   	             ProfileComponent,
   	             DiagnosticComponent,
   	             DiscoverinsurenceComponent,
   	             PharmacyComponent,
   	             SearchdoctorsComponent,
   	             UpdatepasswordComponent,
   	             DoctorProfileComponent,
                 HtmlPipe,
                 FilterPipe,
                // PdfViewerComponent
  ]
})
export class PatientModule { }
