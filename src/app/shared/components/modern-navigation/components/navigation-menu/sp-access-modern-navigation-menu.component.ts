import { Component, Input, Inject, InjectionToken } from '@angular/core';
import { NavigationMenuConfig } from 'src/app/models/navigation-menu.model';
import { Nullable } from 'src/app/models/nullable.type';
const USE_ROLES = new InjectionToken<boolean>('A value that controls if the navigation menu will use role based security or not');
@Component({
  selector: 'sp-access-modern-navigation-menu',
  templateUrl: './sp-access-modern-navigation-menu.component.html',
  styleUrls: ['./sp-access-modern-navigation-menu.component.scss']
})
export class SpAccessModernNavigationMenuComponent {

  constructor(@Inject(USE_ROLES) public readonly useRoles: boolean) {}

  @Input()
  public logoSrc: Nullable<string> = null;

  @Input()
  public logoRedirect: Nullable<string> = null;

  @Input()
  public upperMenuConfig: Nullable<NavigationMenuConfig[]> = null;

  @Input()
  public lowerMenuConfig: Nullable<NavigationMenuConfig[]> = null;

}
