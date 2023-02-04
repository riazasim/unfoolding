import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input()
  public message = '';

  @Input()
  public fullScreen = false;

  @Input()
  public isContainer = false;

  @Input()
  public size: SizeProp = '3x'
}

@NgModule({
  declarations: [LoaderComponent],
  imports: [FontAwesomeModule],
  exports: [LoaderComponent]
})
export class SpAccessLoaderModule {}
