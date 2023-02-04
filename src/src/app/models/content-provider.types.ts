import { Observable } from 'rxjs';

export interface ContentProvider<T> {
  getContent(): T;
}

export type ObservableContentProvider<T> = ContentProvider<Observable<T>>;
export type PromiseContentProvider<T> = ContentProvider<Promise<T>>;
