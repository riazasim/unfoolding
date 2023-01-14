import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { DeaUserForgotPasswordModel } from 'src/app/models/password.models';
import { DeaPasswordService } from 'src/app/services/dea-password.service';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';
import { createEmailControl } from 'src/app/shared/validators/generic-controls';


@Component({
  selector: 'dea-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgottenPasswordComponent implements OnInit {
  formGroup: FormGroup;
  @ViewChild(MatStepper)
  private readonly formWizard!: MatStepper;

  constructor(private readonly passwordService: DeaPasswordService,
              private readonly snackbarService: MatSnackBar,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      email: createEmailControl()
    });
  }

  public handleFormData(): void {
    this.passwordService.forGot({ email: this.formGroup.value.email }).subscribe({
      error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail']),
      complete: () => this.formWizard.next()
    });
  //   this.passwordService
  //     .requestResetPasswordToken({ email: this.formGroup.value.email })
  //     .subscribe({
  //       error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail']),
  //       complete: () => this.formWizard.next()
  //     });
  }
}

