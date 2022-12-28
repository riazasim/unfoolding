import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, NgModule } from '@angular/core';

@Component({
  selector: '[sp-access-bordered-grid-item]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpAccessBorderedGridItemComponent {
  @HostBinding('class')
  private readonly classList = 'tw-rounded-app tw-p-4 tw-border-[1.5px] tw-border-primary';
}


@NgModule({
  declarations: [SpAccessBorderedGridItemComponent],
  imports: [CommonModule],
  exports: [SpAccessBorderedGridItemComponent]
})
export class SpAccessBorderedGridItemModule {
}
