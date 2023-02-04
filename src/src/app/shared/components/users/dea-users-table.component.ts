import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Nullable } from 'src/app/models/nullable.type';
import { DeaSubUserModel } from 'src/app/models/user.model';
import { SimpleTable } from '../tables/simple-table';

@Component({
  selector: 'dea-users-table',
  templateUrl: 'dea-users-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaUsersTableComponent extends SimpleTable<DeaSubUserModel> {

  @Input()
  public deleteUserAction: Nullable<(id: number) => void> = null;

  @Input()
  public goToUserAction: Nullable<(id: number) => void> = null;

  protected initializeDisplayedColumns(): string[] {
    return ['firstName', 'lastName', 'position', 'email', 'phoneNumber', 'actions'];
  }
}


@NgModule({
  declarations: [DeaUsersTableComponent],
  imports: [
    CommonModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgScrollbarModule,
    FontAwesomeModule
  ],
  exports: [DeaUsersTableComponent]
})
export class DeaUsersTableModule {}
