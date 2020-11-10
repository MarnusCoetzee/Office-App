import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllOfficesComponent } from './all-offices/all-offices.component';

const routes: Routes = [{ path: '', component: AllOfficesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
