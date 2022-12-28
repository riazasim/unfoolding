import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { BillingProfileModel } from 'src/app/models/billing-profile.model';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm/confirm-modal.component';
import { MultipleEntityDataGenerator } from 'src/app/shared/utils/generators';


function createBillingProfile(): BillingProfileModel {
  return {
    accountType: faker.finance.accountName(),
    address: faker.address.streetAddress(true),
    country: faker.address.country(),
    name: faker.company.companyName(),
    paymentAccountId: faker.datatype.uuid(),
    paymentAccountNickname: faker.random.alphaNumeric(10),
    registrationNum: faker.datatype.number(100000).toString(),
    vatNum: faker.datatype.number({ min: 0, max: 50 })
  };
}

const createBillingProfiles = MultipleEntityDataGenerator(createBillingProfile);

@Component({
  templateUrl: './billing-profiles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingProfilesComponent {

  public readonly billingHistoryRoute = `../history`;
  public readonly paymentMethodsRoute = `../paymentMethods`;


  public showOffcanvas = false;
  public billingProfiles$: Observable<BillingProfileModel[]>;

  private actualBillingProfiles: BillingProfileModel[] = [];

  public addBillingProfile = () => this.showOffcanvas = true;

  constructor(private readonly dialogService: MatDialog,
              private readonly changeDetector: ChangeDetectorRef) {
    this.billingProfiles$ = of(createBillingProfiles(5)).pipe(tap(x => this.actualBillingProfiles = x));
  }

  public deleteBillingProfile(data: BillingProfileModel) {
    this.dialogService.open(ConfirmModalComponent, {
      data: {
        config: {
          cancelBtnText: 'Cancel',
          acceptBtnText: 'Remove',
          text: `Are you sure you want to remove this business profile?`
        }
      }
    }).afterClosed()
      .pipe(
        filter((x): x is true => x === true)
      )
      .subscribe({
        next: () => {
          this.actualBillingProfiles = this.actualBillingProfiles.filter(x => x.paymentAccountId !== data.paymentAccountId);
          this.billingProfiles$ = of(this.actualBillingProfiles);
          this.changeDetector.detectChanges();
        }
      });
  }
}
