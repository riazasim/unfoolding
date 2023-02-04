import { ChangeDetectionStrategy, Component, Inject, Optional, } from '@angular/core';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';
import { SpAccessPromptComponent } from '../prompt/sp-access-prompt.component';
import { PromptAssetType } from '../sp-access-prompts.module';


@Component({
  selector: 'sp-access-page-not-found-prompt',
  templateUrl: './sp-access-page-not-found-prompt.component.html',
  styleUrls: ['./sp-access-page-not-found-prompt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpAccessPageNotFoundPromptComponent extends SpAccessPromptComponent {

  constructor(
    private readonly assetsProvider: AssetsProviderService<PromptAssetType>,
    @Inject('PROMPT_HOME_PATH')
    @Optional()
    private readonly _homePath: string
  ) {
    super();
    this._homePath = this._homePath || '/home';
    this.heading = 'Page not found';
    this.textContent =
      'The requested page could not be found on this server';
    this.imageSrc = this.assetsProvider.asset('prompts', 'page-not-found.svg');
  }

  public get homePath(): string {
    return this._homePath;
  }
}
