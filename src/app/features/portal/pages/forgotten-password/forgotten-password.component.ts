import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['./forgotten-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgottenPasswordComponent implements OnInit {
  formGroup: FormGroup;
  loader: boolean = false;
  @ViewChild(MatStepper)
  private readonly formWizard!: MatStepper;

  constructor(private readonly passwordService: DeaPasswordService,
              private readonly snackbarService: MatSnackBar,
              private cd: ChangeDetectorRef,
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
    this.loader = true;
    this.passwordService
      .requestResetPasswordToken({ email: this.formGroup.value.email })
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.loader = false;
          this.cd.detectChanges();
          handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
        },
        complete: () => {
          this.loader = false;
          this.cd.detectChanges();
          this.formWizard.next()
        }
      });
  }
}

