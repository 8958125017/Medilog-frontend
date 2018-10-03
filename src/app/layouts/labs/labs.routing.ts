import { Routes ,RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LabsDashboardComponent } from './labs-dashboard/labs-dashboard.component';
import { AuthGuardService} from '../../auth-guard.service';
import { UploadbillComponent } from './uploadbill/uploadbill.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
export const LabsRoutes: Routes = [
  
                    { path: '',pathMatch : 'full',redirectTo: 'dashboard' },
				    { path: 'dashboard',component: LabsDashboardComponent,canActivate:[AuthGuardService] },
				    { path: 'uploadbill',component: UploadbillComponent,canActivate:[AuthGuardService] },
				    { path: 'uploadreport',component: ReportComponent,canActivate:[AuthGuardService] },
				    { path: 'profile',component: ProfileComponent,canActivate:[AuthGuardService] },
				    { path: 'updatepassword',component: UpdatepasswordComponent,canActivate:[AuthGuardService] },
];
