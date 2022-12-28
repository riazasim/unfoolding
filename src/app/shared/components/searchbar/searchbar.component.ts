import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule, Input, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SearchbarComponent implements OnInit {
  public searchStyle: any = {};
  public classes: string = '';
  @Input()
  public maxWidth: number | null = null;

  @Input()
  public minWidth: number | null = null;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.applyStyles();
  }

  public innerWidth: any;

  private applyStyles() {
    if (this.maxWidth !== null) {
      this.searchStyle['maxWidth'] = this.innerWidth > 1376 ? '100%' : `${this.maxWidth}px`;
    }
    if (this.minWidth !== null) {
      this.searchStyle['minWidth'] = this.innerWidth < 1376 ? '100%' : `${this.minWidth}px`;
    }

    if (this.maxWidth) this.classes = 'tw-mx-auto';
    if (!this.maxWidth) this.classes = '';
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.applyStyles();
  }
 }

@NgModule({
  declarations: [
    SearchbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchbarComponent
  ]
})
export class SearchbarModule { }
