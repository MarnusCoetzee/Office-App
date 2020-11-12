import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesRoutingModule } from './offices-routing.module';
import { ViewOfficeComponent } from './view-office/view-office.component';
import { SharedModule } from '../shared/shared.module';
import { AddStaffDialogComponent } from './dialogs/add-staff-dialog/add-staff-dialog.component';
import { EditStaffDialogComponent } from './dialogs/edit-staff-dialog/edit-staff-dialog.component';
import { DeleteStaffDialogComponent } from './dialogs/delete-staff-dialog/delete-staff-dialog.component';

@NgModule({
  declarations: [
    ViewOfficeComponent,
    AddStaffDialogComponent,
    EditStaffDialogComponent,
    DeleteStaffDialogComponent,
  ],
  imports: [CommonModule, OfficesRoutingModule, SharedModule],
})
export class OfficesModule {}
