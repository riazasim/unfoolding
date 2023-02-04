import { NgModule } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';
import { RoleGuard } from '../guards/role.guard';
import { RolePipesModule } from './role-pipes.module';

@NgModule({
  imports: [
    RolePipesModule
  ],
  exports: [
    RolePipesModule
  ],
  providers: [
    RolesService,
    RoleGuard
  ]
})
export class RolesSecurityModule {}
