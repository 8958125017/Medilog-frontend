import { Routes } from '@angular/router';
import { PharmacyDashboardComponent } from './pharmacy-dashboard/pharmacy-dashboard.component';
import { AuthGuardService} from '../../auth-guard.service';
import { UploadbillComponent } from './uploadbill/uploadbill.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';

export const PharmacyRoutes: Routes = [
                    { path: 'dashboard',component: PharmacyDashboardComponent,canActivate:[AuthGuardService] },
                    { path: 'profile',component: ProfileComponent,canActivate:[AuthGuardService] },
                    { path: 'uploadbill',component: UploadbillComponent,canActivate:[AuthGuardService] },
                    { path: 'upatepassword',component: UpdatepasswordComponent,canActivate:[AuthGuardService] }
];
