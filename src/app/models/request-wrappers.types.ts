export interface RequestWrapper<T> {
  data: {
    attributes: T;
  };
}

export interface RequestListWrapper<T, A> {
  data: {
    items: Array<{ type: T, attributes: A }>
  };
}
