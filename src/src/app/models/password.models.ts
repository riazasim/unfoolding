export interface DeaUserForgotPasswordModel {
  email: string;
}

export interface DeaUserResetPasswordModel {
  password: string;
}

export interface DeaUserChangePasswordModel {
  oldPassword: string;
  newPassword: string;
}

export interface DeaUserFirstPasswordModel {
  password: string;
}
