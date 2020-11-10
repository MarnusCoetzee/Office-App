import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { GoogleSigninDirective } from './auth/google-signin.directive';

@NgModule({
  declarations: [LandingPageComponent, AuthComponent, GoogleSigninDirective],
  imports: [CommonModule, LandingPageRoutingModule, SharedModule],
})
export class LandingPageModule {}
