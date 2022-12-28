import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';

@Component({
  selector: '[sp-access-admin-layout], [spAccessAdminLayout]',
  templateUrl: './sp-access-admin-layout.component.html',
  styleUrls: ['./sp-access-admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpAccessAdminLayoutComponent {
  @Input()
  public version: 'legacy' | 'latest' = 'latest';
}



@NgModule({
  declarations: [SpAccessAdminLayoutComponent],
  imports: [
    CommonModule,
    A11yModule
  ],
  exports: [SpAccessAdminLayoutComponent]
})
export class SpAccessAdminLayoutModule { }
