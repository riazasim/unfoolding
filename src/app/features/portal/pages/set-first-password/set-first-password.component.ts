import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { DeaUserFirstPasswordModel } from 'src/app/models/password.models';
// import { DeaPasswordService } from 'src/app/services/dea-password.service';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';
import { createRequiredControl } from 'src/app/shared/validators/generic-controls';
import { appendValidators, createCompareValidator, createPasswordValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  selector: 'dea-set-first-password',
  templateUrl: './set-first-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetFirstPasswordComponent implements OnInit {
  formGroup: FormGroup;
  @ViewChild(MatStepper)
  private readonly formWizard!: MatStepper;

  private readonly tokenParamKey = 'token';
  private readonly token = this.activatedRoute.snapshot.queryParamMap.get(this.tokenParamKey);

  constructor(private readonly snackbarService: MatSnackBar,
              private readonly router: Router,
              // private readonly passwordService: DeaPasswordService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder) {
  }

  /**
   * This page must be accessed only with a valid token
   * So if the token is not present on the URL, redirect to login
   */
  ngOnInit(): void {
    if (this.token === null) {
      this.router.navigate(['sign-in']).then();
      return;
    }

    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      password: appendValidators(
        createRequiredControl(),
        [...createPasswordValidator({
          lowerCase: true,
          upperCase: true,
          digit: true,
          specialCharacter: true,
          minLength: 8
        })]
      ),
      confirmedPassword: appendValidators(createRequiredControl(), createCompareValidator('password'))
    });
  }


  public handleFormData() {
    // this.passwordService
    //   .setFirstPassword({ password: this.formGroup.value.password })
    //   .subscribe({
    //     complete: () => this.formWizard.next(),
    //     error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
    //   });
  }
}
