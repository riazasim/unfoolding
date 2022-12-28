import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { NavigationMenuConfig } from 'src/app/models/navigation-menu.model';
import { Nullable } from 'src/app/models/nullable.type';

@Component({
  selector: 'sp-access-navigation-menu-item',
  templateUrl: './sp-access-navigation-menu-item.component.html',
  styleUrls: ['./sp-access-navigation-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpAccessNavigationMenuItemComponent {

  private static navEndId = 1500;

  @Input()
  public config: Nullable<NavigationMenuConfig> = null;
  @Input()
  public tabIndex: Nullable<number> = null;

  public isActive$: Observable<boolean>;

  private static computeIsActive(url: string, activeOn: string | undefined): boolean {
    return activeOn ? url.includes(activeOn) : false;
  }

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {
    this.isActive$ = this.buildIsActive$(this.router);
  }

  public get redirectRoot(): ActivatedRoute | null {
    return this.activatedRoute.parent;
  }

  private buildIsActive$(router: Router): Observable<boolean> {
    const starter = new NavigationEnd(SpAccessNavigationMenuItemComponent.navEndId++, this.router.url, this.router.url);
    return router.events
      .pipe(
        startWith(starter),
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(event => event.urlAfterRedirects),
        map(url => SpAccessNavigationMenuItemComponent.computeIsActive(url, this.config?.activeOnSegment))
      );
  }
}
