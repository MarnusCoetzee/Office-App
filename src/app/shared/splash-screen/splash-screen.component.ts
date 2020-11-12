import {
  animate,
  animateChild,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { PwaService } from '../../services/pwa.service';
@Component({
  selector: 'app-splash-screen',
  template: `
    <div class="splash-screen" *ngIf="show" @fadeOut>
      <!-- <div class="splash_image">
          <h1>GetFixed</h1>
          <img src="../assets/toolicon.png">
        </div> -->
    </div>
  `,
  animations: [
    // the fade-in/fade-out animation.
    trigger('fadeOut', [
      transition(':leave', [
        query(':leave', animateChild(), { optional: true }),
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
  styles: [
    `
      .splash_image {
        display: grid;
        place-content: center;
      }
      ,
      .splash-screen {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
        background-color: whitesmoke;
        width: 100vw;
        height: 100vh;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashScreenComponent implements OnInit {
  // custom splash screen that works in combination with the PWA service to refresh application in case of update
  show = true;

  constructor(private pwaService: PwaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.pwaService.checkForUpdate().subscribe((result) => {
      this.show = result;
      this.cdr.detectChanges();
    });
  }
}
