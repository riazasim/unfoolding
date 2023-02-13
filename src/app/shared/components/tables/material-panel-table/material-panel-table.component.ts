import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Nullable } from 'src/app/models/navigation-menu.model';
import { PanelModule } from '../../panel/panel.component';
import { SearchbarModule } from '../../searchbar/searchbar.component';

@UntilDestroy()
@Component({
  selector: 'material-panel-table',
  templateUrl: 'material-panel-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialPanelTableComponent {
  public searchText = new Subject<any>();
  public textForSearch;
  private currentSearchSubscription: Subscription | undefined;
  public readonly searchIcon = faSearch;
  // public readonly searchIcon = 'search';
  /**
   *
   */
  constructor() {
    this.searchText.pipe(
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe(() => {
      this.searchedText.emit(this.textForSearch);
    })
  }
  @ViewChild('searchbar')
  public set search$(ref: ElementRef<HTMLInputElement>) {
    if (ref !== undefined) {
      if (this.currentSearchSubscription !== undefined) {
        this.currentSearchSubscription.unsubscribe();
      }
      this.currentSearchSubscription = this.buildSearch$(ref.nativeElement);
    }
  }
  @Output() searchedText = new EventEmitter;
  @Input()
  public showHeader = true;

  @Input()
  public tableTitle: Nullable<string> = null;

  @Input()
  public showSearchbar = true;

  @Input()
  public showButton = true;

  @Input()
  public hasShadow = true;

  @Input()
  public buttonLabel = '';

  @Output()
  public readonly searchedTerm = new EventEmitter<string>();

  @Output()
  public readonly buttonClicked = new EventEmitter<void>();

  private buildSearch$(target: HTMLInputElement): Subscription {
    return fromEvent(target, 'input')
      .pipe(
        debounceTime(150),
        map(event => event.target as HTMLInputElement),
        map(searchbar => searchbar.value),
        untilDestroyed(this)
      )
      .subscribe({
        next: val => this.search(val as any)
      });
  }

  private search(val: string): void {
    this.searchedTerm.emit(val);
  }
}


@NgModule({
  declarations: [MaterialPanelTableComponent],
  imports: [
    CommonModule,
    PanelModule,
    FormsModule,
    SearchbarModule,
    FontAwesomeModule,
    MatRippleModule
  ],
  exports: [MaterialPanelTableComponent]
})
export class MaterialPanelTableModule { }
