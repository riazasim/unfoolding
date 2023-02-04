export interface CredentialsGuardModel {
  canLoad: {
    inverse: boolean;
    redirectTo?: string
  };
  canDeactivate: {
    inverse: boolean,
    redirectTo?: string
  };
}
