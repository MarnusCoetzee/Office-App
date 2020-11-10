import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Office } from 'src/app/model/datamodels';
import { DatabaseService } from 'src/app/services/database.service';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dbService: DatabaseService
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
  }

  onClickNavigateBack() {
    this.router.navigate(['home']);
  }
}
