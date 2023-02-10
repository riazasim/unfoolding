import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Nullable } from 'src/app/models/nullable.type';
import { DeaSubUserModel } from 'src/app/models/user.model';
import { ConfirmModalComponent } from '../confirm/confirm-modal.component';
import { SimpleTable } from '../tables/simple-table';

@Component({
  selector: 'dea-users-table',
  templateUrl: 'dea-users-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaUsersTableComponent extends SimpleTable<DeaSubUserModel> implements OnInit {
  @Input() list: any
  @Input()
  public deleteUserAction: Nullable<(id: number) => void> = null;

  @Input()
  public goToUserAction: Nullable<(id: number) => void> = null;
  /**
   *
   */
  @Output() deleteSubUser = new EventEmitter;
  @Output() passUserData = new EventEmitter;
  constructor(private readonly dialogService: MatDialog,) {
    super();

  }
  protected initializeDisplayedColumns(): string[] {
    return ['firstName', 'lastName', 'position', 'email', 'phoneNumber', 'actions'];
  }
  ngOnInit(): void {
  }

  deleteUser(id: number | string) {
    this.dialogService.open(ConfirmModalComponent, {
      data: {
        config: {
          cancelBtnText: 'Cancel',
          acceptBtnText: 'Remove',
          text: `Are you sure you want to remove this user?`
        }
      }
    }).afterClosed()
      .pipe()
      .subscribe({
        next: () => {
          this.deleteSubUser.emit(id);
        }
      });
  }
  passUserDataToUpdate(data) {
    
    this.passUserData.emit(data);
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
export class DeaUsersTableModule { }
