import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgModule,
  OnInit,
  ViewChild
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Nullable } from 'src/app/models/navigation-menu.model';

@UntilDestroy()
@Component({
  selector: 'thumbnail-load-input-wrapper',
  templateUrl: 'thumbnail-load-input-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpAccessThumbnailLoadInputWrapperComponent implements OnInit {
  @Input() imageSrc
  @ViewChild('fileInputLabel')
  set input(ref: ElementRef<HTMLLabelElement>) {
    const label = ref.nativeElement;
    const input = label.control as HTMLInputElement;
    fromEvent(input, 'change')
      .pipe(
        map(() => input.files),
        filter((fileList): fileList is FileList => fileList !== null),
        map(fl => Array.from(fl)),
        map(flArr => flArr[0]),
        map(file => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))),
        untilDestroyed(this)
      )
      .subscribe({
        next: val => {
          this.thumbnail = val as string;

          this.changeDetector.detectChanges();
        }
      });
  }
  ngOnInit(): void {
    console.log("imageSrc", this.imageSrc)
    setTimeout(() => {
      if (this.imageSrc) {
        console.log("here is thumbanail", this.thumbnail)
        this.thumbnail = this.imageSrc;
        this.changeDetector.detectChanges();
      }
    }, 200)

  }
  @Input()
  public customSize: Nullable<{ width: string, height: string }> = null;

  @Input()
  public thumbnail: Nullable<string> = null;

  @Input()
  public defaultIcon: IconProp = 'user';

  constructor(private readonly changeDetector: ChangeDetectorRef,
    private readonly sanitizer: DomSanitizer) {
  }

}

@NgModule({
  declarations: [SpAccessThumbnailLoadInputWrapperComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [SpAccessThumbnailLoadInputWrapperComponent]
})
export class SpAccessThumbnailLoadInputWrapperModule { }
