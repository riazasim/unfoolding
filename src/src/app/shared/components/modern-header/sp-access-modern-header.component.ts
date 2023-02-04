import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { Nullable } from 'src/app/models/nullable.type';

@Component({
  selector: 'sp-access-modern-header',
  templateUrl: './sp-access-modern-header.component.html',
  styleUrls: ['./sp-access-modern-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpAccessModernHeaderComponent {

  @Input()
  public currentLocation: Nullable<string> = null;

  @Input()
  public logoSrc: Nullable<string> = null;

  @Input()
  public logoRedirect: Nullable<string> = null;

  @Input()
  public optionsTitle: Nullable<string> = 'Options';

  public readonly expandBtnIcon = faBars;
  public readonly closeBtnIcon = faTimes;

  public isMenuClosed = true;

  constructor(public readonly activatedRoute: ActivatedRoute) {
  }

}


@NgModule({
  declarations: [SpAccessModernHeaderComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [SpAccessModernHeaderComponent]
})
export class SpAccessModernHeaderModule {}
