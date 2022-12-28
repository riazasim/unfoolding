import { CommonModule } from '@angular/common';
import { Component, NgModule, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Nullable } from 'src/app/models/navigation-menu.model';
import { ShadowDirective } from '../card-shadows';
import { CardModule } from '../card.module';

@Component({
  selector: '[statistic-card]',
  templateUrl: './statistic-card.component.html'
})
export class StatisticCardComponent extends ShadowDirective {

  @Input()
  public numericValue: string | number = 0;

  @Input()
  public label = '';

  @Input()
  public icon: Nullable<IconProp> = null;

  @Input()
  public colorStyle = 'var(--primary-color)';

}

@NgModule({
  declarations: [StatisticCardComponent],
  imports: [
    CommonModule,
    CardModule,
    FontAwesomeModule
  ],
  exports: [StatisticCardComponent]
})
export class StatisticCardModule {}
