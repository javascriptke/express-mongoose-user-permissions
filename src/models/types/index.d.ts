import { Model, Document } from "mongoose";
/**
 * ***********************************  Role model **********************
 */
interface IRole {
  name: string;
  permissions: number;
  default: boolean;
}

interface IRoleDocument extends IRole, Document {
  [x: string]: any;
  addPermission: (permission: number) => void;
  removePermission: (permission: number) => void;
  hasPermission: (permission: number) => boolean;
  resetPermission: () => void;
 
}

interface IRoleModel extends Model<IRoleDocument> {
  insertRoles: () => void;
  getDefaultRole: () => Promise<IRoleDocument>;
}

/**
 * ****************************** User model *************************
 */

interface IUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: unknown;
  _doc: any;
}

interface IUserDocument extends IUser, Document {
  [x: string]: any;
  hashPassword: (password: string) => Promise<void>;
  comparePassword: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {
  findByEmail: (email: string) => Promise<IUserDocument>;
}
