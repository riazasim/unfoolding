import { Inject, Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { CurrentLocationModule } from './current-location.module';
import { LOCATIONS_MAP } from './injection-tokens';
import { LocationMap } from './location-map.type';


@Injectable({
  providedIn: CurrentLocationModule
})
export class CurrentLocationService implements OnDestroy {

  private currentLocationSubject = new BehaviorSubject<string>('');

  private readonly subscription: Subscription;

  constructor(
    @Inject(LOCATIONS_MAP) private readonly locations: LocationMap,
    private readonly router: Router) {
    this.subscription = this.init();
  }

  private init(): Subscription {
    const seed = this.router.url.split('/');
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects.split('/')),
      startWith(seed),
      map(segments => this.mapSegmentsToLocations(segments)),
      map(locations => locations.pop() ?? '')
    )
      .subscribe({
        next: value => this.currentLocationSubject.next(value)
      });
  }

  public getLocation$(): Observable<string> {
    return this.currentLocationSubject.asObservable();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private mapSegmentsToLocations(segments: string[]): string[] {
    return segments
      .map(segment => this.locations.get(segment))
      .filter((location: string | undefined): location is string => typeof location === 'string');
  }
}
