import { Directive, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateNewOfficeDialogComponent } from 'src/app/home/dialogs/create-new-office-dialog/create-new-office-dialog.component';
@Directive({
  selector: '[appAddNewOffice]',
})
export class AddNewOfficeDirective {
  constructor(private dialog: MatDialog) {}

  @HostListener('click')
  onClick() {
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(CreateNewOfficeDialogComponent);
  }
}
