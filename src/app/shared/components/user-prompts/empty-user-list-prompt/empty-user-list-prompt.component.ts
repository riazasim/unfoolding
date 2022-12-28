import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeaAssets } from 'src/app/models/assets.type';
import { Nullable } from 'src/app/models/nullable.type';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';

@Component({
  selector: 'dea-users-empty-user-list-prompt',
  templateUrl: './empty-user-list-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaEmptyUserListPromptComponent {

  @Input()
  public addUserBtnAction: Nullable<() => void> = null;

  public readonly promptImageSrc: string;
  public readonly promptHeading = 'There are no users enrolled';
  public readonly promptParagraph = 'You can enroll users using the options below.\n Users will have access to the license basket.';

  constructor(assetsProvider: AssetsProviderService<DeaAssets>) {
    this.promptImageSrc = assetsProvider.asset('admin', 'empty-user-list-prompt-img.svg');
  }

}
