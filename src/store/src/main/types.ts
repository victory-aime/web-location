export interface IStateModule<S = any> {
  getReducers(): any;
  getSagas(): any;
  getRootKeyInStore(): string;
  getInitialState?(): S;
}

export interface ILoaderService {
  showLoader(): void;
  hideLoader(): void;
}
