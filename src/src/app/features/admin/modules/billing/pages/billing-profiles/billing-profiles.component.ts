import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';
import { filter, finalize, isEmpty, tap } from 'rxjs/operators';
import { BillingProfileModel } from 'src/app/models/billing-profile.model';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm/confirm-modal.component';
import { MultipleEntityDataGenerator } from 'src/app/shared/utils/generators';
import { id, LegendPosition } from '@swimlane/ngx-charts';
import { LoaderOrchestratorService } from 'src/app/services/loader-orchestrator.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DeabillingApiService } from 'src/app/services/dealing-billing-service';
import { HttpErrorResponse } from '@angular/common/http';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';
import { deleteSubUserAction } from 'src/app/shared/user-store/actions';
import { Router } from '@angular/router';

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
  billingData: any = null;
  public legend = true;
  public legendPosition: LegendPosition = LegendPosition.Right;
  public showOffcanvas = false;
  public billingProfiles$: Observable<BillingProfileModel[]>;
  public pieChardData: { name: string, value: number }[] = [];
  private actualBillingProfiles: BillingProfileModel[] = [];
  private  BillingProfileMode :[]
  public addBillingProfile = () => {
    this.deabillingApiService.billingDataObs.next(null)
    this.showOffcanvas = true;
  }

  constructor(private readonly dialogService: MatDialog,
              private readonly changeDetector: ChangeDetectorRef,
              private deabillingApiService: DeabillingApiService,
              private readonly loaderOrchestrator: LoaderOrchestratorService,
              private readonly router: Router,
              // private snackbarService: SnackbarS,
              private readonly bpo: BreakpointObserver,) {
    this.billingProfiles$ = this.deabillingApiService.requestList();
    
   // let final_val = this.billingProfiles$.pipe(isEmpty(),);  
   if(localStorage.getItem("profile") == "NO"){
    
      this.router.navigate(['admin/billing/profiles'])
    }else{
      if(this.billingProfiles$.valueOf.length >= 0){
        this.router.navigate(['admin/dashboard'])
      }else{
     
  
      
    }
    
  }
    
    bpo.observe('(min-width:768px)')
    .subscribe({
      next: (bpState) => this.legend = bpState.matches
    });
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

          this.deabillingApiService.deleteOne(data.paymentAccountId)
          .pipe(
                finalize(() => this.loaderOrchestrator.setLoaderVisibility(false))
              )
              .subscribe({
                // error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail']),
                next: (resp: any)=>{
                  console.log(resp);
                },
                complete: () => {
                  
                }
              });

        }
      });
  }

  public editBillingProfile(data: BillingProfileModel){
    this.deabillingApiService.billingDataObs.next(data)
    this.showOffcanvas = true;
  }
}
