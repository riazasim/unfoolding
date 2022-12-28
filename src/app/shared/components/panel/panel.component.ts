import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {

  @Input()
  public showHeader = true;

  @Input()
  public hasShadow = true;

}

@NgModule({
  declarations: [PanelComponent],
  imports: [CommonModule],
  exports: [PanelComponent],
})
export class PanelModule {}
