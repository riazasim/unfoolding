import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { type LoaderComponent } from '../shared/components/loader/loader.component';

export type LoaderState = Pick<LoaderComponent, 'message'> & { visible: boolean };

@Injectable({
  providedIn: 'root'
})
export class LoaderOrchestratorService {

  private readonly loaderStateSubject = new BehaviorSubject<LoaderState>({ visible: false, message: 'Please Wait...' });

  public getLoaderState(): Observable<LoaderState> {
    return this.loaderStateSubject.asObservable();
  }

  public setLoaderState(state: LoaderState): void {
    this.loaderStateSubject.next(state);
  }

  public setLoaderMessage(message: LoaderState['message']): void {
    const state: LoaderState = {
      ...this.loaderStateSubject.value,
      message
    };
    this.loaderStateSubject.next(state);
  }

  public setLoaderVisibility(visible: LoaderState['visible']): void {
    const state: LoaderState = {
      ...this.loaderStateSubject.value,
      visible
    };
    this.loaderStateSubject.next(state);
  }

}
