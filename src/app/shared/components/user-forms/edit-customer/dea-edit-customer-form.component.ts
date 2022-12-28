import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IFormGroup } from '@rxweb/types';
import { AbstractForm } from 'src/app/directives/abstract-form';
import { DeaCustomerModel } from 'src/app/models/dea-customer.model';
import { createDeaEditCustomerFormGroup } from './dea-edit-customer-form.group';
import { DeaEditCustomerFormModel, DeaEditCustomerOutputModel } from './dea-edit-customer-form.model';

@Component({
  selector: 'dea-customers-edit-form',
  templateUrl: './dea-edit-customer-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaEditCustomerFormComponent extends AbstractForm<DeaCustomerModel, DeaEditCustomerFormModel, DeaEditCustomerOutputModel> {
  protected buildFormGroup(): IFormGroup<DeaEditCustomerFormModel> {
    return createDeaEditCustomerFormGroup();
  }

  protected convertSeedToFormValue(seed: DeaCustomerModel): DeaEditCustomerFormModel {
    return {
      country: seed.country,
      source: seed.source,
      owner: seed.owner,
      fullName: seed.fullName,
      taxId: seed.taxId,
      signUpDate: formatDate(seed.signUpDate, 'yyyy-MM-dd', 'en-US'),
      contactNumber: seed.contactNumber,
      email: seed.email
    };
  }

  protected convertFormToOutputValue(data: DeaEditCustomerFormModel): DeaEditCustomerOutputModel {
    return {
      country: data.country,
      fullName: data.fullName,
      owner: data.owner,
      signUpDate: new Date(data.signUpDate).getTime(),
      source: data.source,
      taxId: data.taxId,
      contactNumber: data.contactNumber,
      email: data.email
    };
  }

  public get country(): AbstractControl | null {
    return this._formGroup.get('country');
  }

  public get name(): AbstractControl | null {
    return this._formGroup.get('fullName');
  }

  public get owner(): AbstractControl | null {
    return this._formGroup.get('owner');
  }

  public get signUpDate(): AbstractControl | null {
    return this._formGroup.get('signUpDate');
  }

  public get source(): AbstractControl | null {
    return this._formGroup.get('source');
  }

  public get taxId(): AbstractControl | null {
    return this._formGroup.get('taxId');
  }

  public get contactNumber(): AbstractControl | null {
    return this._formGroup.get('contactNumber');
  }

  public get email(): AbstractControl | null {
    return this._formGroup.get('email');
  }


}
