import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AllOfficesComponent } from './all-offices/all-offices.component';
import { CreateNewOfficeDialogComponent } from './dialogs/create-new-office-dialog/create-new-office-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { AddNewOfficeDirective } from '../shared/shell/directives/add-new-office.directive';
import { EditOfficeComponent } from './all-offices/edit-office-dialog/edit-office.component';
import { DeleteOfficeComponent } from './all-offices/delete-office-dialog/delete-office.component';

@NgModule({
  declarations: [
    HomeComponent,
    AllOfficesComponent,
    CreateNewOfficeDialogComponent,
    EditOfficeComponent,
    DeleteOfficeComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
