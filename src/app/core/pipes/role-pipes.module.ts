import { NgModule } from '@angular/core';
import { IsUserInAnyRolePipe } from './isUserInAnyRole.pipe';
import { IsUserInEveryRolePipe } from './isUserInEveryRole.pipe';
import { IsUserInRolePipe } from './isUserInRole.pipe';

@NgModule({
  declarations: [
    IsUserInRolePipe,
    IsUserInAnyRolePipe,
    IsUserInEveryRolePipe
  ],
  providers: [
    IsUserInRolePipe,
    IsUserInAnyRolePipe,
    IsUserInEveryRolePipe
  ],
  exports: [
    IsUserInRolePipe,
    IsUserInAnyRolePipe,
    IsUserInEveryRolePipe
  ]
})
export class RolePipesModule {}
