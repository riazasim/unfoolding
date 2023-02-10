import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
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
constructor( private readonly router: Router,){
  setTimeout(()=>{
console.log("deleteClicked",this.billingProfile)
  },1000)

}
  @Input()
  public withDelete = true;

  @Input()
  public billingProfile: Nullable<BillingProfileModel> = null;

  @Output()
  public readonly deleteClicked = new EventEmitter();

  @Output()
  public readonly editClicked = new EventEmitter<void>();
  routrdashboard(){
    this.router.navigate(['admin/dashboard'])
  }
  public delete(billingProfile){
    console.log("Billing profile",billingProfile);
    this.deleteClicked.emit(billingProfile)

  }
}

