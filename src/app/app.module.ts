import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { environment } from 'src/environments/environment.prod';
import * as firebase from 'firebase';
// importing shared module
import { SharedModule } from './shared/shared.module';
import { SplashScreenComponent } from './shared/splash-screen/splash-screen.component';
import { ServiceWorkerModule } from '@angular/service-worker';
firebase.default.initializeApp(environment.firebase);
@NgModule({
  declarations: [AppComponent, SplashScreenComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
