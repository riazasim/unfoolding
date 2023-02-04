import { Pipe, PipeTransform } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';

@Pipe({
  name: 'isUserInRole'
})
export class IsUserInRolePipe implements PipeTransform {

  constructor(private readonly rolesService: RolesService) {
  }

  public transform(role: string): boolean {
    return this.rolesService.isUserInRole(role);
  }

}
