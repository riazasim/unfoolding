export interface DeaNavigationModel {
    portal: {
      root: string;
      pages: {
        signUp: string,
        signIn: string,
        forgottenPassword: string;
        setFirstPassword: string;
        resetPassword: string;
      }
    };
    admin: {
      root: string;
      pages: {
        dashboard: string;
        users: string;
        usage: string;
        billing: string;
        customer: string;
      }
    };
  }