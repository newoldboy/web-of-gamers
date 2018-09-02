import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/autenticacao/login.component';
import { RoutesInterceptor } from './auth/routes.interceptor';

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [RoutesInterceptor], canActivateChild: [RoutesInterceptor] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' }
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: [RoutesInterceptor],
})
export class AppRoutingModule {
}
