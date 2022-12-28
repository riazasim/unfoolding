import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeaBillingProfile } from 'src/app/models/dea-billing-profile.model';
import { Nullable } from 'src/app/models/nullable.type';

@Component({
  selector: 'dea-billing-profile',
  templateUrl: 'dea-billing-profile.component.html',
  styles: [
    `
      dd, dt {
        color: #4A525D;
      }

      dt {
        font-weight: 500;
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }

      dd {
        font-weight: 400;
        font-size: 0.9rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaBillingProfileComponent {

  @Input()
  public withDelete = true;

  @Input()
  public billingProfile: Nullable<DeaBillingProfile> = null;

  @Output()
  public readonly deleteClicked = new EventEmitter<void>();

}


@NgModule({
  declarations: [
    DeaBillingProfileComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    DeaBillingProfileComponent
  ]
})
export class DeaBillingProfileModule {}
