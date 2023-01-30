import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Nullable } from 'src/app/models/nullable.type';
import { DeaRegistrationModel } from 'src/app/models/registration.models';
import { DeaRegistrationService } from 'src/app/services/dea-registration.service';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';
import { createEmailControl, createLetterOnlyFormControl, createRequiredControl } from 'src/app/shared/validators/generic-controls';
import { appendValidators, createDigitOnlyValidator } from 'src/app/shared/validators/generic-validators';

@Component({
  selector: 'dea-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  formGroup: FormGroup;
  loader: boolean = false;
  @ViewChild(MatStepper)
  private readonly registrationWizard!: MatStepper;
  private registrationData: Nullable<DeaRegistrationModel> = null;

  constructor(private readonly snackbarService: MatSnackBar,
    private readonly registrationService: DeaRegistrationService,
    private readonly fb: FormBuilder,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      firstName: createLetterOnlyFormControl(),
      lastName: createLetterOnlyFormControl(),
      contactNumber: appendValidators(createRequiredControl(), [...createDigitOnlyValidator()]),
      email: createEmailControl()
    });
  }

  public handleFormData(): void {
    this.registrationData = this.formGroup.value;
    this.registrationWizard.next();
  }

  public sendRegistrationRequest(): void {
    this.loader = true;
    if (!this.registrationData) {
      this.loader = false;
      this.cd.detectChanges();
      throw new Error('Empty Registration Data');
    }

    this.registrationService
      .register(this.registrationData)
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.loader = false;
          this.cd.detectChanges();
          handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
        },
        complete: () => {
          this.loader = false;
          this.cd.detectChanges();
          this.registrationWizard.next()
        }
      });
  }

  public get email(): Nullable<string> {
    return this.registrationData?.email ?? null;
  }

}
