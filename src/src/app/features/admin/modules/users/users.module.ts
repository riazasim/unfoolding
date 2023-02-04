import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { OffCanvasModule } from 'src/app/shared/components/offcanvas/offcanvas.component';
import { MaterialPanelTableModule } from 'src/app/shared/components/tables/material-panel-table/material-panel-table.component';
import { DeaUsersTableModule } from 'src/app/shared/components/users/dea-users-table.component';
import { DeaUserPromptsModule } from 'src/app/shared/components/user-prompts/dea-user-prompts.module';
import { DeaUserFormsModule } from 'src/app/shared/components/user-form/dea-user-forms.module';
import { DeaSubUsersStoreModule } from 'src/app/shared/user-store/store.module';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialPanelTableModule,
    OffCanvasModule,
    DeaUsersTableModule,
    DeaUserPromptsModule,
    DeaUserFormsModule,
    DeaSubUsersStoreModule,
    FontAwesomeModule,
  ]
})
export class UsersModule {}
