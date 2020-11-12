import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-staff-dialog',
  templateUrl: './delete-staff-dialog.component.html',
  styleUrls: ['./delete-staff-dialog.component.scss'],
})
export class DeleteStaffDialogComponent implements OnInit {
  officeId: string;
  employeeId: string;
  employeeName: string;

  isLoading: boolean;
  constructor(
    private dialogRef: MatDialogRef<DeleteStaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private dbService: DatabaseService,
    private snackbar: MatSnackBar
  ) {
    this.employeeId = data.employeeId;
    this.officeId = data.officeId;
    this.employeeName = data.firstName + ' ' + data.lastName;
  }

  ngOnInit(): void {}

  onClickDeleteStaffMember() {
    const officeId = this.officeId;
    const employeeId = this.employeeId;
    this.isLoading = true;
    this.dbService
      .removeOfficeEmployee(officeId, employeeId)
      .then(() => {
        this.dbService.decreaseOfficeEmployeeTotal(officeId);
        this.isLoading = false;
        this.dialogRef.close();
        this.snackbar.open('Successfully removed staff member', '', {
          duration: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        this.snackbar.open('An error has occurred, please try again', '', {
          duration: 2000,
        });
        return;
      });
  }
}
