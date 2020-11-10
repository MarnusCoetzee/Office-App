import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { GoogleSigninDirective } from './auth/directives/google-signin.directive';
import { AnonSigninDirective } from './auth/directives/anon-signin.directive';

@NgModule({
  declarations: [
    LandingPageComponent,
    AuthComponent,
    GoogleSigninDirective,
    AnonSigninDirective,
  ],
  imports: [CommonModule, LandingPageRoutingModule, SharedModule],
})
export class LandingPageModule {}
