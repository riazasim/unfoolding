import { Pipe, PipeTransform } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';

@Pipe({
  name: 'isUserAnyInRole'
})
export class IsUserInAnyRolePipe implements PipeTransform {

  constructor(private readonly rolesService: RolesService) {
  }

  public transform(roles: string[]): boolean {
    return this.rolesService.isUserInAnyRole(roles);
  }

}
