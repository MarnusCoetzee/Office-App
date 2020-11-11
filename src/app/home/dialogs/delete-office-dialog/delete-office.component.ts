import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-office',
  templateUrl: './delete-office.component.html',
  styleUrls: ['./delete-office.component.scss'],
})
export class DeleteOfficeComponent implements OnInit {
  isLoading: boolean;

  officeId: string;
  officeName: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteOfficeComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private dbService: DatabaseService,
    private snackbar: MatSnackBar
  ) {
    this.officeId = data.officeId;
    this.officeName = data.officeName;
  }

  ngOnInit(): void {}

  onClickCloseDialog() {
    this.dialogRef.close();
  }

  onClickDeleteOffice() {
    const id = this.officeId;
    this.isLoading = true;
    this.dbService
      .deleteOffice(id)
      .then(() => {
        this.isLoading = false;
        this.dialogRef.close();
        this.snackbar.open('Successfully removed office', '', {
          duration: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.snackbar.open('An error has occurred, please try again');
        return;
      });
  }
}
