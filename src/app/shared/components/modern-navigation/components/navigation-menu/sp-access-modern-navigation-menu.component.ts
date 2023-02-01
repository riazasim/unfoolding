import { Component, Input, Inject, InjectionToken } from '@angular/core';
import { DeaAssets } from 'src/app/models/assets.type';
import { NavigationMenuConfig } from 'src/app/models/navigation-menu.model';
import { Nullable } from 'src/app/models/nullable.type';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';
// const USE_ROLES = new InjectionToken<boolean>('A value that controls if the navigation menu will use role based security or not');
@Component({
  selector: 'sp-access-modern-navigation-menu',
  templateUrl: './sp-access-modern-navigation-menu.component.html',
  styleUrls: ['./sp-access-modern-navigation-menu.component.scss']
})
export class SpAccessModernNavigationMenuComponent {
  public readonly coverImgSrc: string;
  constructor(
    assetsProvider: AssetsProviderService<DeaAssets>
    //@Inject(USE_ROLES) public readonly useRoles: boolean
  ) {
    this.coverImgSrc = assetsProvider.asset('portal', 'logo.svg');
  }

  @Input()
  public logoSrc: Nullable<string> = null;

  @Input()
  public logoRedirect: Nullable<string> = null;

  @Input()
  public upperMenuConfig: Nullable<NavigationMenuConfig[]> = null;

  @Input()
  public lowerMenuConfig: Nullable<NavigationMenuConfig[]> = null;

}
