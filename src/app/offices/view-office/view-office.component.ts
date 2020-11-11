import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee, Office } from 'src/app/model/datamodels';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  employees: Array<Employee> = [
    {
      employeeId: '123',
      firstName: 'Marnus',
      lastName: 'Coetzee',
    },
    {
      employeeId: '122',
      firstName: 'Johan',
      lastName: 'Botha',
    },
    {
      employeeId: '111',
      firstName: 'Marijke',
      lastName: 'Louw',
    },
    {
      employeeId: '121',
      firstName: 'Jeanne',
      lastName: 'De Wet',
    },
    {
      employeeId: '125',
      firstName: 'Daniel',
      lastName: 'Novitzkas',
    },
  ];

  filteredEmployees: Array<Employee> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dbService: DatabaseService,
    private fb: FormBuilder
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

    this.searchForm = this.fb.group({
      searchString: '',
    });
    this.onChanges();
  }

  onChanges(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      if (value.searchString.length > 0) {
        console.log('showing filtered names');
        this.showFiltered = true;
      }
      if (value.searchString.length === 0) {
        console.log('Showing original array again');
        this.showFiltered = false;
      }
      this.filteredEmployees = this.employees.filter((searchedEmployee) => {
        return searchedEmployee.firstName
          .toLowerCase()
          .includes(value.searchString.toLowerCase());
      });
      console.log(value.searchString.length);
      console.log(this.filteredEmployees);
    });
  }

  onClickNavigateBack() {
    this.router.navigate(['home']);
  }
}
