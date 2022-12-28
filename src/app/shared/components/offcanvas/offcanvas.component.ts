import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OffcanvasComponent {
  @Input()
  public show = true;

  @Input()
  public position: 'left' | 'right' = 'right';
}

@NgModule({
  declarations: [OffcanvasComponent],
  imports: [CommonModule],
  exports: [OffcanvasComponent]
})
export class OffCanvasModule {}
