import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { EmailVerificationLinkComponent } from './components/email-verification-link/email-verification-link.component';
import { ApiService } from './services/api.service';

// var currentLanguage = 'en/';

const routes: Routes = [
  {
    path: '',
    redirectTo:  'lawyer',
    pathMatch: 'full'
  },
  {
    path:  "admin",
    loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
  },
  {
    path:  "lawyer",
    loadChildren: () => import('./lawyer/lawyer.module').then(x => x.LawyerModule)
  },
  {
    path:  "client",
    loadChildren: () => import('./client/client.module').then(x => x.ClientModule)
  },
  {
    path:  "account/confirm-email",
    component: EmailVerificationLinkComponent
  },
  {
    path: '**',
    redirectTo:  'lawyer',//redirect to page not found
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    // this.apiService.apiLanguage.subscribe((resp) => {
    //   if (currentLanguage != resp) {
    //     currentLanguage = resp;
    //     this.router.navigateByUrl("aa");
    //     console.log(resp)
    //   }
    // })

  }
}
