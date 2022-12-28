import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input, NgModule } from '@angular/core';
import { Nullable } from 'src/app/models/nullable.type';

@Component({
  selector: '[sp-access-flat-card-grid-item]',
  template: `
    <header class='tw-w-full' *ngIf='this.imgSrc'>
      <img [src]='this.imgSrc' alt='grid-item-picture'>
    </header>
    <main class='tw-border-primary tw-border-b-[1.5px] tw-border-r-[1.5px]
                 tw-p-4 tw-rounded-b-app tw-border-l-[1.5px]'>
      <ng-content></ng-content>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpAccessFlatCardGridItemComponent {
  @Input()
  public imgSrc: Nullable<string> = null;

  @HostBinding('class')
  private readonly classList = 'tw-rounded-app tw-overflow-auto tw-w-full';
}


@NgModule({
  declarations: [SpAccessFlatCardGridItemComponent],
  imports: [CommonModule],
  exports: [SpAccessFlatCardGridItemComponent]
})
export class SpAccessFlatCardGridItemModule {
}
