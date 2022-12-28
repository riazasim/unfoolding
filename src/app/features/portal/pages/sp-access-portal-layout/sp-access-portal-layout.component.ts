import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';


@Component({
  selector: '[sp-access-portal-layout]',
  templateUrl: './sp-access-portal-layout.component.html',
  styleUrls: ['./sp-access-portal-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpAccessPortalLayoutComponent {
  @Input()
  public decorationMaxWidth: string | undefined = '775px';
  @Input()
  public contentMaxWidth: string | undefined = 'unset';
  @Input()
  public decorationMinWidth: string | undefined = '600px';
}


@NgModule({
  declarations: [
    SpAccessPortalLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpAccessPortalLayoutComponent
  ]
})
export class SpAccessPortalLayoutModule {}
