import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormGroup } from '@rxweb/types';
import { WireForm } from 'src/app/directives/wire-form copy';
import { DeaBillingProfile } from 'src/app/models/dea-billing-profile.model';

@Component({
  selector: 'billing-profile-form',
  templateUrl: './dea-billing-profile-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaBillingProfileFormComponent extends WireForm<DeaBillingProfile> {
  protected buildFormGroup(): IFormGroup<DeaBillingProfile> {
    return new FormGroup({}) as IFormGroup<DeaBillingProfile>;
  }
}
