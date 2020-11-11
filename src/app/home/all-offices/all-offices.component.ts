import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Office } from 'src/app/model/datamodels';
import { DatabaseService } from '../../services/database.service';
import { CreateNewOfficeDialogComponent } from '../dialogs/create-new-office-dialog/create-new-office-dialog.component';
import { DeleteOfficeComponent } from '../dialogs/delete-office-dialog/delete-office.component';
import { EditOfficeComponent } from '../dialogs/edit-office-dialog/edit-office.component';
@Component({
  selector: 'app-all-offices',
  templateUrl: './all-offices.component.html',
  styleUrls: ['./all-offices.component.scss'],
})
export class AllOfficesComponent implements OnInit {
  isLoading: boolean;

  offices: Office[];
  officesSubscription: Subscription;

  constructor(
    private dbService: DatabaseService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // start loading
    this.isLoading = true;
    // get all offices associated with the user's id
    this.officesSubscription = this.dbService
      .getUserOffices()
      // subscribe to offices that belong to user
      .subscribe((allOffices) => {
        this.offices = allOffices;
        console.log(this.offices);
        // stop loading
        this.isLoading = false;
      });
  }

  onClickOpenAddOfficeDialog() {
    this.dialog.open(CreateNewOfficeDialogComponent);
  }

  onClickOpenEditOfficeDialog(officeId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = {
      officeId,
    };
    this.dialog.open(EditOfficeComponent, dialogConfig);
  }

  onClickOpenDeleteOfficeDialog() {
    this.dialog.open(DeleteOfficeComponent);
  }

  onClickNavigateOffice(id: string) {
    this.router.navigate(['office', id]);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.officesSubscription) {
      this.officesSubscription.unsubscribe();
    }
  }
}
