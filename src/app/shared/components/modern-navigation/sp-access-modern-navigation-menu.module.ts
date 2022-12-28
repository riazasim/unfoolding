import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RolePipesModule } from 'src/app/core/pipes/role-pipes.module';

import {
  SpAccessNavigationMenuItemComponent
} from './components/navigation-menu-item/sp-access-navigation-menu-item.component';
import {
  SpAccessModernNavigationMenuComponent
} from './components/navigation-menu/sp-access-modern-navigation-menu.component';

@NgModule({
  declarations: [
    SpAccessNavigationMenuItemComponent,
    SpAccessModernNavigationMenuComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    RolePipesModule
  ],
  exports: [
    SpAccessModernNavigationMenuComponent
  ]
})
export class SpAccessModernNavigationMenuModule {
  public static noRoles(): ModuleWithProviders<SpAccessModernNavigationMenuModule> {
    return {
      ngModule: SpAccessModernNavigationMenuModule
    };
  }
}
