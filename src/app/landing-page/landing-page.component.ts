import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  // subscribe to auth state
  authSubscription: Subscription;
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    // get auth state via afAuth
    this.authSubscription = this.afAuth.authState.subscribe((authResult) => {
      if (authResult) {
        // user is authenticated
        this.router.navigate(['home']); // automatically navigate to home page
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
