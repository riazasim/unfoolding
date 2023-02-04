import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { IconicInputWrapperComponent } from './components/input-wrapper/iconic-input-wrapper.component';
import { IconicPasswordWrapperComponent } from './components/password-wrapper/iconic-password-wrapper.component';
import { IconicSelectWrapperComponent } from './components/select-wrapper/iconic-select-wrapper.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { SpAccessPromptsModule } from './components/prompts/sp-access-prompts.module';

const commonExports = [
  IconicInputWrapperComponent,
  IconicPasswordWrapperComponent,
  IconicSelectWrapperComponent,
]

@NgModule({
  declarations: [
    ...commonExports,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    CdkTableModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgScrollbarModule,
    CreditCardDirectivesModule,
    SpAccessPromptsModule
  ],
  exports: [
    ...commonExports
  ]
})
export class SharedModule { }
