import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { DeaPasswordService } from 'src/app/services/dea-password.service';
import { DeaUserResetPasswordModel } from 'src/app/models/password.models';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';
import { appendValidators, createCompareValidator, createPasswordValidator } from 'src/app/shared/validators/generic-validators';
import { createRequiredControl } from 'src/app/shared/validators/generic-controls';

@Component({
  selector: 'dea-reset-password',
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  @ViewChild(MatStepper)
  private readonly wizard!: MatStepper;

  private readonly tokenParamKey = 'token';
  public readonly token = this.activatedRoute.snapshot.queryParamMap.get(this.tokenParamKey);

  constructor(
    // private readonly passwordService: DeaPasswordService,
    private readonly snackbarService: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder) {
  }

  /**
   * This page must be accessed only with a valid token
   * So if the token is not present on the URL, redirect to login
   */
  ngOnInit(): void {
    if (this.token === null) {
      this.router.navigate(['sign-in']).then();
    }
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      password: appendValidators(createRequiredControl(),
        [
          ...createPasswordValidator({
            specialCharacter: true,
            digit: true,
            upperCase: true,
            lowerCase: true,
            minLength: 8
          })
        ]
      ),
      confirmedPassword: appendValidators(createRequiredControl(), createCompareValidator('password'))
    });
  }

  public handleFormData(formData: DeaUserResetPasswordModel): void {
    // this.passwordService
    //   .resetPassword({ password: formData.password })
    //   .subscribe({
    //     error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail']),
    //     complete: () => this.wizard.next()
    //   });
  }


}
