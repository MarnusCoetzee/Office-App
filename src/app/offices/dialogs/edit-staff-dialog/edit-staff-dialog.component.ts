import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/datamodels';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit-staff-dialog',
  templateUrl: './edit-staff-dialog.component.html',
  styleUrls: ['./edit-staff-dialog.component.scss'],
})
export class EditStaffDialogComponent implements OnInit {
  officeId: string;
  employeeId: string;
  employeeFirstName: string;
  employeeLastName: string;

  staffForm: FormGroup;

  isLoading: boolean;
  constructor(
    private dialogRef: MatDialogRef<EditStaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private dbService: DatabaseService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.employeeId = data.employeeId;
    this.officeId = data.officeId;
    this.employeeFirstName = data.firstName;
    this.employeeLastName = data.lastName;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.staffForm = this.fb.group({
      firstName: [this.employeeFirstName, Validators.required],
      lastName: [this.employeeLastName, Validators.required],
    });
  }

  get firstNameFromForm(): any {
    return this.staffForm.get('firstName');
  }

  get lastNameFromForm(): any {
    return this.staffForm.get('lastName');
  }

  onClickClearTextField(id: string) {
    if (id === 'firstName') {
      this.firstNameFromForm.reset();
    }
    if (id === 'lastName') {
      this.lastNameFromForm.reset();
    }
  }

  onClickUpdateUser() {
    this.isLoading = true;
    const employeeId = this.employeeId;
    const officeId = this.officeId;
    const firstName = this.staffForm.value.firstName;
    const lastName = this.staffForm.value.lastName;
    const staffMember: Employee = {
      employeeId,
      firstName,
      lastName,
    };
    this.dbService
      .editOfficeEmployee(officeId, employeeId, staffMember)
      .then(() => {
        this.isLoading = false;
        this.dialogRef.close();
        this.snackbar.open('Successfully changed employee details', '', {
          duration: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        this.snackbar.open('An error has occurred, please try again', '', {
          duration: 2000,
        });
        this.isLoading = false;
        return;
      });
  }

  onClickCloseDialog() {
    this.dialogRef.close();
  }
}
