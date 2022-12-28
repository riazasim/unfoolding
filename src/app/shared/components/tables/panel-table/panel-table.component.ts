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
import { MatRippleModule } from '@angular/material/core';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Nullable } from 'src/app/core/models/navigation-menu.model';

import { PanelModule } from '../../panel/panel.component';
import { SearchbarModule } from '../../searchbar/searchbar.component';

@UntilDestroy()
@Component({
  selector: 'panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelTableComponent {

  private currentSearchSubscription: Subscription | undefined;
  // public readonly searchIcon = faSearch;
  public readonly searchIcon = 'faSearch';

  @ViewChild('searchbar')
  public set search$(ref: ElementRef<HTMLInputElement>) {
    if (ref !== undefined) {
      if (this.currentSearchSubscription !== undefined) {
        this.currentSearchSubscription.unsubscribe();
      }
      this.currentSearchSubscription = this.buildSearch$(ref.nativeElement);
    }
  }

  @Input()
  public tableTitle: Nullable<string> = null;

  @Input()
  public showSearchbar = true;

  @Input()
  public showButton = true;

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
        next: val => this.search(val)
      });
  }

  private search(val: string): void {
    this.searchedTerm.emit(val);
  }

}

@NgModule({
  declarations: [
    PanelTableComponent
  ],
  imports: [
    CommonModule,
    // FontAwesomeModule,
    SearchbarModule,
    PanelModule,
    MatRippleModule
  ],
  exports: [
    PanelTableComponent
  ]
})
export class PanelTableModule {}
