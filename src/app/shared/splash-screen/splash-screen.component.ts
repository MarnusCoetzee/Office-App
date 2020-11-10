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
      // Your custom splash screen design
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
      .splash-screen {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashScreenComponent implements OnInit {
  show: boolean = true;

  constructor(
    private pwaService: PwaService,
    private cdr: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.pwaService.checkForUpdate().subscribe((result) => {
      this.show = result;
      this.cdr.detectChanges();
    });
  }
}
