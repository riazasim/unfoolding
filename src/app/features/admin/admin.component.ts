import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DeaAssets } from 'src/app/models/assets.type';
import { NavigationMenuConfig } from 'src/app/models/navigation-menu.model';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';
import { DeaNavigationMenuContentProviderService } from 'src/app/services/dea-navigation-menu-content-provider.service';
// import { LogoutService } from 'src/app/services/logout.service';
import { CurrentLocationService } from 'src/app/shared/components/current-location/current-location.service';


@Component({
  selector: 'dea-admin',
  templateUrl: './admin.component.html',
  styles: [
    `
      :host {
        --header-bg: transparent;
        --app-border-radius: 10px;
        --offcanvas-bg: #F4F6F8;
      }
    `
  ],
  providers: [DeaNavigationMenuContentProviderService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {


  public readonly logoImgSrc: string;
  public readonly navigationMenuItems$: Observable<NavigationMenuConfig[]>;
  public readonly currentLocation$: Observable<string>;

  public notificationsCount = 5;

  constructor(
    // private readonly logoutService: LogoutService,
    assetsProvider: AssetsProviderService<DeaAssets>,
    currentLocationService: CurrentLocationService,
    navigationMenuSettingsProvider: DeaNavigationMenuContentProviderService) {

    this.logoImgSrc = assetsProvider.asset('shared', 'logo.png');
    this.navigationMenuItems$ = navigationMenuSettingsProvider.getContent();
    this.currentLocation$ = currentLocationService.getLocation$();
  }

  public logout(): void {
    // this.logoutService.logout().subscribe();
  }
}
