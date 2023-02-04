import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, NgModule } from '@angular/core';
import { ShadowDirective, CardShadows } from './card-shadows';


@Component({
  selector: '[card]',
  template: `
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent extends ShadowDirective {

  @HostBinding('class')
  private get classList(): string {
    return `tw-rounded-lg tw-p-4 tw-bg-white tw-relative tw-overflow-hidden ${CardShadows[this.shadow]}`;
  }
}


@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule {}
