import { Routes } from '@angular/router';
import { ViewpatientComponent } from './viewpatient/viewpatient.component';
import { DoctorrequestComponent } from './doctorrequest/doctorrequest.component';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { CreateprescriptionComponent } from './createprescription/createprescription.component';
import { RecordreviewComponent } from './recordreview/recordreview.component';
import { ProfileComponent } from './profile/profile.component';
import { SeeEHRComponent } from './see-ehr/see-ehr.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
export const DoctorRoutes: Routes = [
    { path : '',pathMatch : 'full',redirectTo: 'dashboard' },
    { path : 'dashboard', component : DashboardComponent },
    { path : 'viewpatients',      component: ViewpatientComponent },
    { path : 'doctorrequest', component : DoctorrequestComponent},
    { path : 'addpatient', component : AddpatientComponent},
    { path : 'createprescription/:aadharNo', component : CreateprescriptionComponent},    
    { path : 'seeEHR/:aadharNo/:name', component: SeeEHRComponent},
    { path : 'profile', component : ProfileComponent},
    { path : 'updatepassword', component : UpdatepasswordComponent},
];
