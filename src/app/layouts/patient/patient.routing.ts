import { Routes ,RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { EHRPullHistoryComponent } from './ehrpull-history/ehrpull-history.component';
import { HealthAnalysisComponent } from './health-analysis/health-analysis.component';
import { ConnectDeviceComponent } from './connect-device/connect-device.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { AuthGuardService} from '../../auth-guard.service';
import { ProfileComponent } from './profile/profile.component';


import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { DiscoverinsurenceComponent } from './discoverinsurence/discoverinsurence.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { SearchdoctorsComponent } from './searchdoctors/searchdoctors.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
export const PatientRoutes: Routes = [    
				    { path: '',pathMatch : 'full',redirectTo: 'dashboard' },
				    { path: 'dashboard',component: PatientDashboardComponent,canActivate:[AuthGuardService] },				    
				    { path: 'ehr',component: EHRPullHistoryComponent,canActivate:[AuthGuardService] },   
				    { path: 'healthAnalysis',component: HealthAnalysisComponent,canActivate:[AuthGuardService] },   
				    { path: 'connectDevice',component: ConnectDeviceComponent,canActivate:[AuthGuardService] },

				    // { path: 'patientProfile',component: PatientProfileComponent },    
				    // { path : 'profile', component : ProfileComponent},

				    { path: 'patientProfile',component: PatientProfileComponent,canActivate:[AuthGuardService] }, 
				    { path: 'doctorProfile/:aadharNo',component: DoctorProfileComponent,canActivate:[AuthGuardService] }, 
				    { path: 'diagnostic',component: DiagnosticComponent,canActivate:[AuthGuardService] },   
				    { path: 'discoverInsurence',component: DiscoverinsurenceComponent ,canActivate:[AuthGuardService]},
				    { path: 'pharmacy',component: PharmacyComponent,canActivate:[AuthGuardService] },
				    { path: 'searchdoctors',component: SearchdoctorsComponent ,canActivate:[AuthGuardService]},    
                    { path: 'updatepassword',component: UpdatepasswordComponent ,canActivate:[AuthGuardService]},    
];
