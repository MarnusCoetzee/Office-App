import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee, Office } from 'src/app/model/datamodels';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddStaffDialogComponent } from '../dialogs/add-staff-dialog/add-staff-dialog.component';
import { EditStaffDialogComponent } from '../dialogs/edit-staff-dialog/edit-staff-dialog.component';
import { DeleteStaffDialogComponent } from '../dialogs/delete-staff-dialog/delete-staff-dialog.component';

@Component({
  selector: 'app-view-office',
  templateUrl: './view-office.component.html',
  styleUrls: ['./view-office.component.scss'],
})
export class ViewOfficeComponent implements OnInit {
  isLoading: boolean = false;

  officeId: string;

  officeDetails: Office;
  officeSubscription: Subscription;

  searchForm: FormGroup;

  showFiltered: boolean = false;

  employeesSubscription: Subscription;

  employees: Employee[];

  filteredEmployees: Array<Employee> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dbService: DatabaseService,
    private fb: FormBuilder,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.officeId = this.activatedRoute.snapshot.paramMap.get('id');

    // get the office details from the db
    this.officeSubscription = this.dbService
      .getSingleOffice(this.officeId)
      .subscribe((officeResult: Office) => {
        this.officeDetails = officeResult;
        console.log(officeResult);
        this.isLoading = false;
      });
    // get the staff that belong to the office
    this.employeesSubscription = this.dbService
      .getOfficeEmployees(this.officeId)
      .subscribe((staff: Employee[]) => {
        this.employees = staff;
        console.log(this.employees);
      });

    // form used for search input box
    this.searchForm = this.fb.group({
      searchString: '',
    });
    this.onChanges();
  }

  /**
   * Function that filteres through employee names and shows result
   */
  onChanges(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      // show different array results in html, use showFiltered with ngIf to switch between arrays
      // show filtered array if a search input has been detected
      if (value.searchString.length > 0) {
        console.log('showing filtered names');
        this.showFiltered = true;
      }
      // show original array if the search input is cancelled
      if (value.searchString.length === 0) {
        console.log('Showing original array again');
        this.showFiltered = false;
      }
      this.filteredEmployees = this.employees.filter((searchedEmployee) => {
        const employeeName =
          searchedEmployee.firstName + ' ' + searchedEmployee.lastName;
        return employeeName
          .toLowerCase()
          .includes(value.searchString.toLowerCase());
      });
      console.log(value.searchString.length);
      console.log(this.filteredEmployees);
    });
  }

  // Navigate Back To Home
  onClickNavigateBack() {
    this.router.navigate(['home']);
  }

  // Open Add Staff Dialog
  onClickOpenAddStaffDialog(officeId: string) {
    // get the office ID to send to add staff dialog
    officeId = this.officeId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = {
      officeId,
    };
    this.matDialog.open(AddStaffDialogComponent, dialogConfig);
  }

  // Open Edit Staff Dialog
  onClickOpenEditStaffDialog(employeeId: string) {
    this.matDialog.open(EditStaffDialogComponent);
  }

  // Open delete staff
  onClickOpenDeleteStaffDialog(employeeId: string) {
    // get the staff ID to send to add staff dialog
    const officeId = this.officeId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '350px';
    dialogConfig.minHeight = '350px';
    dialogConfig.data = {
      employeeId,
      officeId,
    };
    this.matDialog.open(DeleteStaffDialogComponent);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.officeSubscription) {
      this.officeSubscription.unsubscribe();
    }
    if (this.employeesSubscription) {
      this.employeesSubscription.unsubscribe();
    }
  }
}
