import { Pipe, PipeTransform } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';

@Pipe({
  name: 'isUserInEveryRole'
})
export class IsUserInEveryRolePipe implements PipeTransform {

  constructor(private readonly rolesService: RolesService) {
  }

  public transform(roles: string[]): boolean {
    return this.rolesService.isUserInEveryRole(roles);
  }

}
