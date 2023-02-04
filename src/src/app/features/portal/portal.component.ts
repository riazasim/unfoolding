import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeaAssets } from 'src/app/models/assets.type';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';

@Component({
  selector: 'dea-portal',
  templateUrl: './portal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalComponent {
  public readonly coverImgSrc: string;
  constructor(assetsProvider: AssetsProviderService<DeaAssets>) {
    this.coverImgSrc = assetsProvider.asset('portal', 'cover.png');
  }
}
