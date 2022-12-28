import { DeaSubUserModel } from "src/app/models/user.model";

export type DeaAddSubUserFormModel = Omit<DeaSubUserModel, 'id'>;
