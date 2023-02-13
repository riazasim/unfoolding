import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { defer, NEVER, finalize, share } from 'rxjs';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  private overlayRef: OverlayRef = undefined;
  constructor(private readonly overlay: Overlay) {}
  public readonly spinner$ = defer(() => {

    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());
  private show(): void {
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: false,
      });
      this.overlayRef.attach(new ComponentPortal(SpinnerComponent));
    });
  }
  public hide(): void {
    this.overlayRef.detach();
    this.overlayRef = undefined;
  }
}
