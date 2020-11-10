import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AllOfficesComponent } from './all-offices/all-offices.component';
import { CreateNewOfficeDialogComponent } from './dialogs/create-new-office-dialog/create-new-office-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { EditOfficeComponent } from './dialogs/edit-office-dialog/edit-office.component';
import { DeleteOfficeComponent } from './dialogs/delete-office-dialog/delete-office.component';

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
