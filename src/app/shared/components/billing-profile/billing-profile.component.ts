import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BillingProfileModel } from 'src/app/models/billing-profile.model';
import { Nullable } from 'src/app/models/navigation-menu.model';

@Component({
  selector: 'admin-billing-profile',
  templateUrl: 'billing-profile.component.html',
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
export class BillingProfileComponent {

  @Input()
  public withDelete = true;

  @Input()
  public billingProfile: Nullable<BillingProfileModel> = null;

  @Output()
  public readonly deleteClicked = new EventEmitter<void>();

}

