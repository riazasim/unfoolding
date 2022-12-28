import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeaLoginModel, DeaLoginResponseModel } from 'src/app/models/login.models';
import { BearerTokenService } from 'src/app/services/bearer-token/bearer-token.service';
// import { DeaLoginService } from 'src/app/services/dea-login.service';
import { RolesService } from 'src/app/services/roles.service';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';
import { createRequiredControl } from 'src/app/shared/validators/generic-controls';

@Component({
  selector: 'dea-sign-in',
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private readonly snackbarService: MatSnackBar,
              private readonly router: Router,
              private readonly rolesService: RolesService,
              // private readonly loginService: DeaLoginService,
              private readonly bearerTokenService: BearerTokenService,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      email: createRequiredControl(),
      password: createRequiredControl()
    })
  }

  public handleFormData(): void {
    // this.loginService
    //   .login(this.formGroup.value)
    //   .subscribe({
    //     next: (response: DeaLoginResponseModel) => {
    //       this.bearerTokenService.authToken = response.token;
    //       this.rolesService.setUserRoles([response.role]);
    //     },
    //     complete: () => this.router.navigate(['admin']),
    //     error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
    //   });
  }
}
