import { Routes } from '@angular/router';
import { HospitalDashboardComponent } from './hospital-dashboard/hospital-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService} from '../../auth-guard.service';
import { ViewdoctorsComponent } from './viewdoctors/viewdoctors.component';
import { AdddoctorComponent } from './adddoctor/adddoctor.component';
import { AddpharmacyComponent } from './addpharmacy/addpharmacy.component';
import { AddlabsComponent } from './addlabs/addlabs.component';
import { ViewpharmacyComponent } from './viewpharmacy/viewpharmacy.component';
import { ViewlabsComponent } from './viewlabs/viewlabs.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { ViewpatientComponent } from './viewpatient/viewpatient.component';
import { AddpatientComponent } from './addpatient/addpatient.component';
export const HospitalRoutes: Routes = [    
                    { path: '',pathMatch : 'full',redirectTo: 'dashboard' },
                    { path: 'profile', component : ProfileComponent,canActivate:[AuthGuardService]},
                    { path: 'dashboard',component: HospitalDashboardComponent ,canActivate:[AuthGuardService]},
                    { path: 'viewdoctor',component: ViewdoctorsComponent,canActivate:[AuthGuardService] },
                    { path: 'adddoctor',component: AdddoctorComponent ,canActivate:[AuthGuardService]},                    
                    { path: 'viewpharmacy',component: ViewpharmacyComponent, canActivate:[AuthGuardService]}, 
                    { path: 'addpharmacy',component: AddpharmacyComponent ,canActivate:[AuthGuardService]},                 
                    { path: 'adddiagnostic',component: AddlabsComponent,canActivate:[AuthGuardService] },
                    { path: 'viewdiagnostic',component: ViewlabsComponent,canActivate:[AuthGuardService]},
                    { path: 'updatepassword',component: UpdatepasswordComponent,canActivate:[AuthGuardService]},
                    { path: 'doctorProfile/:aadharNo',component: DoctorProfileComponent,canActivate:[AuthGuardService] }, 
                    { path :'viewpatients',component: ViewpatientComponent },
                    { path : 'addpatient', component : AddpatientComponent},

                 
];
