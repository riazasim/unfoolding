import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Nullable } from 'src/app/models/navigation-menu.model';
import { CardModule } from '../cards/card.module';

@Component({
  selector: '[sp-access-raised-card-grid-item]',
  template: `
    <div card class="tw-p-0 tw-w-full tw-h-full">
      <header class="tw-w-full" *ngIf="this.imgSrc">
        <img class="tw-w-full tw-h-full tw-max-h-xs tw-object-fill" [src]="this.imgSrc" alt="grid-item-picture">
      </header>
      <main class="tw-p-4">
        <ng-content></ng-content>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpAccessRaisedCardGridItemComponent {
  @Input()
  public imgSrc: Nullable<string> | SafeResourceUrl = null;
}


@NgModule({
  declarations: [SpAccessRaisedCardGridItemComponent],
  imports: [CommonModule, CardModule],
  exports: [SpAccessRaisedCardGridItemComponent]
})
export class SpAccessRaisedCardGridItemModule {}
