import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormGroup } from '@rxweb/types';
import { WireForm } from 'src/app/directives/wire-form copy';
import { BillingProfileModel } from 'src/app/models/billing-profile.model';
import { DeaBillingProfile } from 'src/app/models/dea-billing-profile.model';
import { DeabillingApiService } from 'src/app/services/dealing-billing-service';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';

@Component({
  selector: 'billing-profile-form',
  templateUrl: './dea-billing-profile-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaBillingProfileFormComponent implements OnInit {

  formGroup!: FormGroup;

  @Input() data: any;

  constructor(private fb: FormBuilder, private deabillingApiService: DeabillingApiService, private cd: ChangeDetectorRef) { }
  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      paymentAccountNickname: new FormControl('', [Validators.required]),
      accountType: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      vatNumber: new FormControl('', [Validators.required]),
      registrationNumber: new FormControl('', [Validators.required]),
    });

    this.deabillingApiService.billingDataObs.subscribe((data: any) => {
      this.data = data;
      console.log(this.data);
      
      if (this.data) {
        this.formGroup.patchValue({
          paymentAccountNickname: data.paymentAccountNickname,
          accountType: data.accountType,
          country: data.country,
          name: data.name,
          address: data.address,
          vatNumber: data.vatNumber,
          registrationNumber: data.registrationNumber,
        })
      }
      else{
        this.formGroup.reset();
      }
      this.cd.detectChanges();

    })

  }

  submit() {
    // this.loader = true;
    let payload = this.formGroup.value;
    payload.vatNum = payload.vatNum
    if(!this.data){
      this.deabillingApiService
      .addOne(payload)
      .subscribe({
        next: (response: BillingProfileModel) => {
          console.log(response);
        },
        complete: () => {
        },
        error: (err: HttpErrorResponse) => {
        }
      });
    }
    else{
      this.deabillingApiService
      .updateOne(payload,this.data.id)
      .subscribe({
        next: (response: BillingProfileModel) => {
          console.log(response);
        },
        complete: () => {
        },
        error: (err: HttpErrorResponse) => {
        }
      });
    }
  }


}
