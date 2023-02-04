import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: '[grid-presentation-layout], [gridPresentationLayout]',
  templateUrl: './grid-presentation-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridPresentationLayoutComponent<T> {

  public readonly gridDataSource = new MatTableDataSource<T>([]);

  // Layout Setup
  @Input()
  public columnTemplate = 'repeat(auto-fit,200px)';

  @Input()
  public rowHeight = '200px';

  @Input()
  public rowGap = '1rem';

  @Input()
  public columnGap = '1rem';

  @Input()
  public customGridStyle = '';

  // Template Setup
  @Input()
  public addBtnPosition: 'first' | 'last' = 'first';

  @Input()
  public gridItemTemplate: TemplateRef<unknown> | null = null;

  // Data
  @Input()
  public set dataSource(data: T[]|null) {
    this.gridDataSource.data = data || [];
  }

  @Input()
  public set filter(filter: string) {
    this.gridDataSource.filter = filter;
  }

  @Input()
  public showAddNewBtnOnZeroElements = false;
}


@NgModule({
  declarations: [
    GridPresentationLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GridPresentationLayoutComponent
  ]
})
export class GridPresentationLayoutModule {}
