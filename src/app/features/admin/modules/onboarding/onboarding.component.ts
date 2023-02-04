import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeaAssets } from 'src/app/models/assets.type';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';
import { DeaLoginService } from 'src/app/services/dea-login.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit, OnDestroy {
  coverImgSrc1: string;
  coverImgSrc2: string;
  coverImgSrc3: string;
  coverImgSrc4: string;
  coverImgSrc5: string;
  coverImgSrc6: string;
  public loader: boolean;
  public subscription: Subscription[] = [];
  @ViewChild(MatStepper)
  private readonly registrationWizard!: MatStepper;
  constructor(
    private readonly router: Router,
    assetsProvider: AssetsProviderService<DeaAssets>,
    private readonly loginService: DeaLoginService
  ) {
    this.coverImgSrc1 = assetsProvider.asset('portal', '1.1 - Onboarding - Welcome.png');
    this.coverImgSrc2 = assetsProvider.asset('portal', '1.2 - Onboarding - Dashboard.png');
    this.coverImgSrc3 = assetsProvider.asset('portal', '1.3 - Onboarding - Scheduling.png');
    this.coverImgSrc4 = assetsProvider.asset('portal', '1.4 - Onboarding - Status Tracker.png');
    this.coverImgSrc5 = assetsProvider.asset('portal', '1.5 - Onboarding - Partner access.png');
    this.coverImgSrc6 = assetsProvider.asset('portal', '1.6 - Onboarding - Success.png');
  }

  ngOnInit(): void {
  }
  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: any) {
    if (event.key === 'Enter') {
      this.registrationWizard.next();
    }
  }
  gotoDashboard() {
    let role = localStorage.getItem("role");
    const obj = {
      data: {
        attributes: {
          onboardingStatus: true
        }
      }
    }
    this.subscription.push(
      this.loginService.letStart(obj).subscribe(
        (Response) => {
          console.log("Response of Lets start API", Response);
        },
        (Error) => {
          console.log("Error in Lets start API", Error);
        }
      )
    )
    if (role == 'admin') {
      this.router.navigate(['admin/dashboard'])
    }
    else {
      this.router.navigate(['admin/billing/profiles'])
    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }
}
