import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'picture'
})
export class PicturePipe implements PipeTransform {

  constructor(private readonly sanitizer: DomSanitizer) {
  }

  transform(file: File | string): SafeResourceUrl {
    if (typeof file === 'string') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(file);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
  }

}

@NgModule({
  declarations: [PicturePipe],
  exports: [PicturePipe],
  providers: [PicturePipe]
})
export class SpAccessPicturePipeModule {}
