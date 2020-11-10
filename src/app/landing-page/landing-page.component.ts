import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth) {}

  ngOnInit(): void {}
}
