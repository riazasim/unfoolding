import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { SpAccessPromptsModule } from '../prompts/sp-access-prompts.module';
import { DeaEmptyUserListPromptComponent } from './empty-user-list-prompt/empty-user-list-prompt.component';
import { DeaImportUsersPromptComponent } from './import-users-prompt/import-users-prompt.component';
import { DeaSendInvitationsPromptComponent } from './send-invitations-prompt/send-invitations-prompt.component';

@NgModule({
  declarations: [
    DeaEmptyUserListPromptComponent,
    DeaImportUsersPromptComponent,
    DeaSendInvitationsPromptComponent
  ],
  imports: [
    CommonModule,
    SpAccessPromptsModule,
    MatRippleModule
  ],
  exports: [
    DeaEmptyUserListPromptComponent,
    DeaImportUsersPromptComponent,
    DeaSendInvitationsPromptComponent
  ]
})
export class DeaUserPromptsModule {}
