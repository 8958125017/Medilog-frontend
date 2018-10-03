import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToasterModule, ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

import { Ng4LoadingSpinnerModule,Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HospitalComponent} from './layouts/hospital/hospital.component';
import { PatientComponent } from './layouts/patient/patient.component';
import { DoctorComponent } from './layouts/doctor/doctor.component';
import { LabsComponent } from './layouts/labs/labs.component';
import { PharmacyComponent} from './layouts/pharmacy/pharmacy.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { QRCodeModule } from 'angularx-qrcode';
import { GlobalServiceService }  from   './global-service.service';
import { SignupComponent } from './signup/signup.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MessageService } from './message.service';
// import { HtmlPipe } from './html.pipe';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    QRCodeModule,
    ComponentsModule,
    ToasterModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule,
    AppRoutingModule,    
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PatientComponent,
    DoctorComponent,
    LabsComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    HospitalComponent,
    PharmacyComponent,
    SignupComponent,
    ChangepasswordComponent,
    // HtmlPipe
  ],
   providers: [MessageService,ToasterService,Ng4LoadingSpinnerService,GlobalServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
