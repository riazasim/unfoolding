import { ChangeDetectionStrategy, Component, Inject, Input, Optional, } from '@angular/core';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';
import { SpAccessPromptComponent } from '../prompt/sp-access-prompt.component';
import { PromptAssetType } from '../sp-access-prompts.module';

@Component({
  selector: 'sp-access-error-prompt',
  templateUrl: './sp-access-error-prompt.component.html',
  styleUrls: ['./sp-access-error-prompt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpAccessErrorPromptComponent extends SpAccessPromptComponent {
  @Input()
  public retryAction: (() => void) | undefined;

  constructor(
    private readonly assetsProvider: AssetsProviderService<PromptAssetType>,
    @Inject('PROMPT_HOME_PATH')
    @Optional()
    private readonly _homePath: string
  ) {
    super();
    this._homePath = this._homePath || '/home';
    this.heading = 'Error';
    this.textContent =
      'There was an error while processing your request. Please try again';
    this.imageSrc = this.assetsProvider.asset('prompts', 'error.webp');
  }

  public get homePath(): string {
    return this._homePath;
  }
}
