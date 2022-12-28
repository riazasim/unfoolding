export interface ResponseDataItem<T> {
  type: string;
  attributes: T;
}

export interface ResponseItemWrapper<T> {
  data: ResponseDataItem<T>;
}

export interface ResponseArrayWrapper<T> {
  data: {
    type: string;
    items: Array<ResponseDataItem<T>>;
  };
}


