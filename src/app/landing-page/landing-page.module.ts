import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [LandingPageComponent, AuthComponent],
  imports: [CommonModule, LandingPageRoutingModule, SharedModule],
})
export class LandingPageModule {}
