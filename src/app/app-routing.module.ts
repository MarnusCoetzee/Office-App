import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'offices',
    loadChildren: () =>
      import('./offices/offices.module').then((m) => m.OfficesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
