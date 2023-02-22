import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'admin-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentMethodFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  @Input()
  public id = '';
  constructor(private readonly fb: FormBuilder,
    private readonly snackbar: MatSnackBar) {
    this.form = this.fb.group({
      Name: ['', Validators.required],
      CardNo: ['', Validators.required],
      Expiry: ['', Validators.required],
      CVV: ['', Validators.required],
      Country: ['', Validators.required],
      City: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      Postal: ['', Validators.required],
    })
  }
  onSubmit() {
    if (this.form.invalid) {
      this.snackbar.open('Please fill all the fields', 'Error');
    } else {
      console.log("formValue", this.f);
    }
  }
  public get f() {
    return this.form.value;
  }
  public get fc() {
    return this.form.controls;
  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }
}
