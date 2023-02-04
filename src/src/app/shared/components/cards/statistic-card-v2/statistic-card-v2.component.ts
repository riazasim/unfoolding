import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShadowDirective } from '../card-shadows';
import { CardModule } from '../card.module';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Nullable } from 'src/app/models/navigation-menu.model';

@Component({
  selector: '[statistic-card-v2]',
  templateUrl: 'statistic-card-v2.component.html'
})
export class StatisticCardV2Component extends ShadowDirective {
  @Input()
  public numericValue: string | number = 0;

  @Input()
  public label = '';

  @Input()
  public icon: Nullable<IconProp> = null;

  @Input()
  public colorStyle = '#85a5c8';

  @Input()
  public textColor = '#000'
}

@NgModule({
  declarations: [StatisticCardV2Component],
  imports: [
    CommonModule,
    CardModule,
    FontAwesomeModule
  ],
  exports: [StatisticCardV2Component]
})
export class StatisticCardV2Module {}
