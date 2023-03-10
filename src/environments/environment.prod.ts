export const environment = {
  production: true,
  assetsRoot: '',
  API_URL:'http://44.203.195.99:8080/api/admin/',
  config: {
    poolingInterval: 0,
    router: { enableTracing: true }
  },
  api: {
    root: '/api',
    namespaces: {
      subUserUsages: '',
      subUser: '/sub-users',
      dashboard: '',
      security: '',
      user: '',
      default: ''
    }
  },

  navigation: {
    portal: {
      root: 'portal',
      pages: {
        signIn: 'login',
        forgottenPassword: 'forgotten-password',
        signUp: 'register',
        resetPassword: 'reset-password',
        setFirstPassword: 'verify-user-email'
      }
    },
    admin: {
      root: 'admin',
      pages: {
        dashboard: 'dashboard',
        billing: 'billing',
        customer: 'customer',
        usage: 'usage',
        users: 'users'
      }
    }
  }
};
