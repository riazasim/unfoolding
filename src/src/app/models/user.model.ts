export interface DeaUserModel {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  email: string;
  phoneNumber: string;
}

export interface DeaInvitations {
  emails: string[];
}


export type DeaSubUserModel = Omit<DeaUserModel, 'role'>;


export interface DeaSubUserUsage {
  createdAt: {
    date: number,
    timezone: string
  },
  email: string;
  source: string;
  balance: number;
}
