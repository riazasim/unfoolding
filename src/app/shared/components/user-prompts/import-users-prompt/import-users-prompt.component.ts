import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeaAssets } from 'src/app/models/assets.type';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';

@Component({
  selector: 'dea-users-import-users-prompt',
  templateUrl: './import-users-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        --prompt-main-text-align: left;
      }
    `
  ]
})
export class DeaImportUsersPromptComponent {

  public readonly promptImgSrc: string;
  public readonly promptHeading = 'Import users';
  public readonly promptParagraph = `User import completed successfully!\nIn your user list you can find all your users and their status (active or pending).`;

  constructor(assetsProvider: AssetsProviderService<DeaAssets>) {
    this.promptImgSrc = assetsProvider.asset('admin', 'import-users-prompt-img.svg');
  }

}
