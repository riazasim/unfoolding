import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpAccessErrorPromptComponent } from './error-prompt/sp-access-error-prompt.component';
import { SpAccessPageNotFoundPromptComponent } from './page-not-found-prompt/sp-access-page-not-found-prompt.component';
import { SpAccessPromptComponent } from './prompt/sp-access-prompt.component';


@NgModule({
  declarations: [
    SpAccessPromptComponent,
    SpAccessErrorPromptComponent,
    SpAccessPageNotFoundPromptComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SpAccessPromptComponent,
    SpAccessErrorPromptComponent,
    SpAccessPageNotFoundPromptComponent
  ]
})
export class SpAccessPromptsModule { }

export type PromptAssetType = 'prompts';
