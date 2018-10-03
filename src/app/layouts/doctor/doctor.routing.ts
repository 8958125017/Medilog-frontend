import { Routes } from '@angular/router';
import { ViewpatientComponent } from './viewpatient/viewpatient.component';
import { DoctorrequestComponent } from './doctorrequest/doctorrequest.component';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { CreateprescriptionComponent } from './createprescription/createprescription.component';
import { RecordreviewComponent } from './recordreview/recordreview.component';
import { ProfileComponent } from './profile/profile.component';
import { SeeEHRComponent } from './see-ehr/see-ehr.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
export const DoctorRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: '',pathMatch : 'full',redirectTo: 'dashboard' },
    { path: 'dashboard', component : ViewpatientComponent },
    { path: 'viewpatients',      component: ViewpatientComponent },
    { path : 'doctorrequest', component : DoctorrequestComponent},
    { path : 'addpatient', component : AddpatientComponent},
    { path : 'createprescription/:aadharNo', component : CreateprescriptionComponent},
    // { path: 'recordreview', component : RecordreviewComponent},
    { path: 'seeEHR/:aadharNo/:name', component: SeeEHRComponent},
    { path : 'profile', component : ProfileComponent},
    { path : 'updatepassword', component : UpdatepasswordComponent},
];
