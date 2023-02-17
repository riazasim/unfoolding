import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeaAssets } from 'src/app/models/assets.type';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';

@Component({
  selector: 'dea-users-send-invitations-prompt',
  templateUrl: './send-invitations-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        --prompt-main-text-align: left;
      }
    `
  ]
})
export class DeaSendInvitationsPromptComponent {
  // @Input() formDataToinvite;
  public readonly promptHeading = 'Send invitation';
  public readonly promptParagraph = `You can now send an invitation to your users to download the our Data Entry Automation add-in.\n You can always do this later by accessing the Users list.`;
  public readonly promptImgSrc: string;

  constructor(assetsProvider: AssetsProviderService<DeaAssets>) {
    this.promptImgSrc = assetsProvider.asset('portal', 'send-invitations-prompt-img.png');
  }


}
