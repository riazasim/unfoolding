import { APP_BASE_HREF } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { ASSETS_ROOT } from './injection-tokens';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AssetsProviderService<T extends string = string> {

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(APP_BASE_HREF) @Optional() private readonly _baseHref?: string,
    @Inject(ASSETS_ROOT) @Optional() private readonly _assetsRootUrl?: string
  ) {
    if (typeof _assetsRootUrl !== 'string') {
      this._assetsRootUrl = '';
    } else if (!_assetsRootUrl.endsWith('/')) {
      this._assetsRootUrl = `${_assetsRootUrl}/`;
    }

    if (typeof _baseHref !== 'string') {
      const base = this.document.querySelector('base');
      if (base) {
        this._baseHref = base.href;
      } else {
        throw new Error('Base element does not exist. Please provide either the base element or the APP_BASE_HREF token');
      }
      this._baseHref = this._baseHref.replace(/\/$/g, '');
    }
  }

  public asset(category: T, assetName: string): string {
    return `${this._baseHref}/${this._assetsRootUrl}assets/${category}/${assetName}`;
  }

  public requestTranslationAssetSrc(lang: string): string {
    return `${this._baseHref}${this._assetsRootUrl}assets/i18n/${lang}.json`.replace(/^\//, '');
  }

  public get assetsRootUrl(): string | undefined {
    return this._assetsRootUrl;
  }

  public get baseHref(): string | undefined {
    return this._baseHref;
  }

}
