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
  coverImgSrc1: string;
  coverImgSrc2: string;
  coverImgSrc3: string;
  coverImgSrc4: string;
  coverImgSrc5: string;
  coverImgSrc6: string;
  showPassword: boolean = false;
  constructor(private readonly snackbarService: MatSnackBar,
              private readonly router: Router,
              private readonly rolesService: RolesService,
              private readonly loginService: DeaLoginService,
              private readonly bearerTokenService: BearerTokenService,
              private readonly fb: FormBuilder,
              assetsProvider: AssetsProviderService<DeaAssets>,
              private cd: ChangeDetectorRef) {
                this.coverImgSrc1 = assetsProvider.asset('portal', '1.1 - Onboarding - Welcome.png');
                this.coverImgSrc2 = assetsProvider.asset('portal', '1.2 - Onboarding - Dashboard.png');
                this.coverImgSrc3 = assetsProvider.asset('portal', '1.3 - Onboarding - Scheduling.png');
                this.coverImgSrc4 = assetsProvider.asset('portal', '1.4 - Onboarding - Status Tracker.png');
                this.coverImgSrc5 = assetsProvider.asset('portal', '1.5 - Onboarding - Partner access.png');
                this.coverImgSrc6 = assetsProvider.asset('portal', '1.6 - Onboarding - Success.png');
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

  toggleShowPassword(){
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
          // this.rolesService.setUserRoles([response.data.user_info.attributes.firstName]);
          // console.log(response.user_info.attributes.firstName + " " + response.user_info.attributes.lastName);
          this.rolesService.setuserInfoSubject([response.user_info]);
          debugger
          localStorage.setItem("role",response.role)
          this.loader = false;
          this.cd.detectChanges();
        },
        complete: () => {          
          this.loader = false;
          this.cd.detectChanges();
          let role = localStorage.getItem("role");
          if(role == 'admin'){
          this.router.navigate(['admin/dashboard'])
          }
          else{
            this.router.navigate(['admin/billing/profiles'])
          }
        },
        error: (err: HttpErrorResponse) => {
          this.loader = false;
          this.cd.detectChanges();
          // handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
        }
      });
  }
}
