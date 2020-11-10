import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOfficeComponent } from './view-office/view-office.component';

const routes: Routes = [{ path: ':id', component: ViewOfficeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficesRoutingModule {}
