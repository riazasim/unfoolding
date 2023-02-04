import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IFormGroup } from '@rxweb/types';
import { WireForm } from 'src/app/directives/wire-form copy';
import { DeaProductModel } from 'src/app/models/dea-product.model';
import { createDeaProductFormGroup } from './dea-product-form.group';

@Component({
  selector: 'dea-billing-product-form',
  templateUrl: './dea-product-form.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaProductFormComponent extends WireForm<Omit<DeaProductModel, 'id'>> {

  protected buildFormGroup(): IFormGroup<Omit<DeaProductModel, 'id'>> {
    return createDeaProductFormGroup();
  }

  public get firstPartnerFee(): AbstractControl | null {
    return this._formGroup.get('firstPartnerFee');
  }

  public get name(): AbstractControl | null {
    return this._formGroup.get('name');
  }

  public get price(): AbstractControl | null {
    return this._formGroup.get('price');
  }

  public get secondPartnerFee(): AbstractControl | null {
    return this._formGroup.get('secondPartnerFee');
  }

  public get type(): AbstractControl | null {
    return this._formGroup.get('type');
  }

}
