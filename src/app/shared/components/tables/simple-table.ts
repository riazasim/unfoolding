import { Directive, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Nullable } from 'src/app/models/navigation-menu.model';

@Directive()
export abstract class SimpleTable<T> {

  protected readonly _dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();


  @ViewChild(MatPaginator)
  protected set paginator(paginator: MatPaginator) {
    this._dataSource.paginator = paginator;
  }

  @ViewChild(MatSort)
  private set sort(sort: MatSort) {
    this._dataSource.sort = sort;
  }

  @Input()
  public loading = true;

  @Input()
  public set filter(filter: Nullable<string | undefined>) {
    const sanitizedFilter = (filter ?? '').trim();
    if (this._dataSource) {
      this._dataSource.filter = sanitizedFilter;
    }
  }

  @Input()
  public set data(data: Nullable<ReadonlyArray<T>>) {
    this._dataSource.data = this.dataTransformer(data ?? []).concat();
  }

  public displayedColumns: string[];

  constructor() {
    this.displayedColumns = this.initializeDisplayedColumns();
  }

  protected abstract initializeDisplayedColumns(): string[];

  public get dataSource(): MatTableDataSource<T> {
    return this._dataSource;
  }

  protected dataTransformer(data: ReadonlyArray<T>): ReadonlyArray<T> {
    return data;
  }

}
