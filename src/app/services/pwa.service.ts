import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable, of, timer } from 'rxjs';
import { catchError, first, mapTo, switchMap, timeout } from 'rxjs/operators';
import { from as fromPromise } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PwaService {
  constructor(private appRef: ApplicationRef, private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.appRef.isStable
        .pipe(
          first((isStable) => isStable === true),
          switchMap(() => this.swUpdate.available)
        )
        .subscribe(() => {
          this.swUpdate.activateUpdate().then(() => document.location.reload());
        });
    }
  }

  checkForUpdate(): Observable<boolean> {
    const waitFor = 1000;

    if (this.swUpdate.isEnabled) {
      const available$ = this.swUpdate.available.pipe(
        mapTo(true),
        timeout(waitFor),
        catchError(() => of(false))
      );
      return fromPromise(this.swUpdate.checkForUpdate()).pipe(
        switchMap(() => available$)
      );
    }
    return timer(waitFor).pipe(mapTo(false));
  }
}
