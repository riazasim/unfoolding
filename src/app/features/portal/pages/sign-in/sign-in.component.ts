import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeaAssets } from 'src/app/models/assets.type';
import { DeaLoginModel, DeaLoginResponseModel } from 'src/app/models/login.models';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';
import { BearerTokenService } from 'src/app/services/bearer-token/bearer-token.service';
import { DeaLoginService } from 'src/app/services/dea-login.service';
import { RolesService } from 'src/app/services/roles.service';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';
import { createRequiredControl } from 'src/app/shared/validators/generic-controls';

@Component({
  selector: 'dea-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  formGroup: FormGroup;
  loader: boolean = false;
  lo: any;

  showPassword: boolean = false;
  constructor(private readonly snackbarService: MatSnackBar,
    private readonly router: Router,
    private readonly rolesService: RolesService,
    private readonly loginService: DeaLoginService,
    private readonly bearerTokenService: BearerTokenService,
    private readonly fb: FormBuilder,
 
    private cd: ChangeDetectorRef) {
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

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  public handleFormData(): void {
    this.loader = true;
    console.log(this.formGroup.value);

    this.loginService
      .login(this.formGroup.value)
      .subscribe({
        
        next: (response: DeaLoginResponseModel) => {
          this.bearerTokenService.authToken = response.token;
          this.bearerTokenService.authCookie = response.token;
          this.rolesService.setUserRoles([response.role]);
          this.rolesService.setuserInfoSubject([response.user_info]);
          localStorage.setItem("role", response.role)
          localStorage.setItem("user-role", JSON.stringify([response.user_info]))
          this.loader = false;
          this.cd.detectChanges();
        },
        complete: () => {
          this.loader = false;
          this.cd.detectChanges();
          this.router.navigate(['admin/onboarding'])
          // let role = localStorage.getItem("role");
          // if (role == 'admin') {
          //   this.router.navigate(['admin/dashboard'])
          // }
          // else {
          //   this.router.navigate(['admin/billing/profiles'])
          // }
        },
        error: (err: HttpErrorResponse) => {
          this.loader = false;
          this.cd.detectChanges();
          handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
        }
      });
  }
}
