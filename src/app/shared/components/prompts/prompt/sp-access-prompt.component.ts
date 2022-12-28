import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Nullable } from 'src/app/models/nullable.type';

@Component({
  selector: 'sp-access-prompt',
  templateUrl: './sp-access-prompt.component.html',
  styleUrls: ['./sp-access-prompt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpAccessPromptComponent {
  @Input()
  public imageSrc: Nullable<string> = null;

  @Input()
  public heading: Nullable<string> = null;

  @Input()
  public textContent: Nullable<string> = null;

}
