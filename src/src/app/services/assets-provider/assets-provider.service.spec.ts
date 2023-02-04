import { AssetsProviderService } from './assets-provider.service';

const baseHrefTokenVal = 'base_href';
const baseHrefElementVal = 'base_href_element';

const querySelector = () => {
  const base = document.createElement('base');
  base.href = baseHrefElementVal;
  return base;
};
const documentMock = { querySelector } as unknown as Document;

describe('AssetsProviderService correctness', () => {

  const testCategory = 'test-category';
  let service: AssetsProviderService<typeof testCategory>;

  it('Should throw an error if there is no APP_BASE_HREF and no <base/> element', () => {
    expect(() => new AssetsProviderService(document)).toThrow(/Please provide /);
  });

  it('Should use the APP_BASE_HREF token value if it is provided', () => {
    const service = new AssetsProviderService(document, baseHrefTokenVal);
    expect(service.baseHref).toEqual(baseHrefTokenVal);
  });

  it('Should take the <base/> element if the APP_BASE_HREF token is not provided', async () => {
    const service = new AssetsProviderService(documentMock);
    // This is using toContain because if you take the href from <base/> you are also getting the protocol and domain
    expect(service.baseHref).toContain(baseHrefElementVal);
  });


  it('should append a slash to the assets root if the slash is not provided', () => {
    const rootVal = 'HELLO_WORLD';
    const service = new AssetsProviderService(document, '', rootVal);
    expect(service.assetsRootUrl).toEqual(`${rootVal}/`);
  });

  it('should have an assetRootValue equal to the one provided in the ASSETS_ROOT when provided, plus a slash if none provided', () => {
    const rootVal = 'HELLO_WORLD/';
    service = new AssetsProviderService(document, '', rootVal);
    expect(service.assetsRootUrl).toEqual(rootVal);
  });

  it('should get an asset path with the following structure: ASSETS_ROOT/assets/CATEGORY/ASSET_NAME if the token is provided', () => {
    const rootVal = 'HELLO_WORLD';
    service = new AssetsProviderService(document, '', rootVal);
    const assetName = 'assetName';
    const assetUrl = service.asset(testCategory, assetName);
    const segments = assetUrl.split('/');
    expect(segments[0]).toEqual(rootVal);
    expect(segments[1]).toEqual('assets');
    expect(segments[2]).toEqual(testCategory);
    expect(segments[3]).toEqual(assetName);
  });

  it('should get an asset path with the following structure: assets/CATEGORY/ASSET_NAME if the token is NOT provided', () => {
    const service = new AssetsProviderService(document, '');
    const assetName = 'assetName';
    const assetUrl = service.asset(testCategory, assetName);
    const segments = assetUrl.split('/');
    expect(segments[0]).toEqual('assets');
    expect(segments[1]).toEqual(testCategory);
    expect(segments[2]).toEqual(assetName);
  });

});
