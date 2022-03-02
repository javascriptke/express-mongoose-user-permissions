import { model, Schema } from "mongoose";
import { Permission } from ".";
import { IRoleDocument, IRoleModel } from "./types";



const RoleSchema: Schema<IRoleDocument> = new Schema(
  {
    name: {
      type: String,
    },
    permissions: {
      type: Number,
      default: 0,
    },
    default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

RoleSchema.methods.hasPermission = function (permission: number): boolean {
  return (this.permissions & permission) === permission;
};

RoleSchema.methods.addPermission = function (permission: number): void {
  if (!this.hasPermission(permission)) {
    this.permissions += permission;
  }
};
RoleSchema.methods.removePermission = function (permission: number): void {
  if (!this.hasPermission(permission)) {
    this.permissions -= permission;
  }
};

RoleSchema.methods.resetPermission = function (): void {
  this.permissions = 0;
};
RoleSchema.statics.insertRoles = async function () {
  const roles: { [prop: string]: number[] } = {
    ["User"]: [Permission.VIEW, Permission.COMMENT, Permission.LIKE],
    ["Moderator"]: [
      Permission.VIEW,
      Permission.COMMENT,
      Permission.LIKE,
      Permission.MODERATE,
    ],
    ["Admin"]: [
      Permission.VIEW,
      Permission.COMMENT,
      Permission.LIKE,
      Permission.MODERATE,
      Permission.ADMIN,
    ],
  };

  const defaultRole = "User";

  for (let r of Object.keys(roles)) {
    let role: IRoleDocument = await this.findOne({ name: r });
    if (!role) {
      role = new Role({ name: r });
    }
    role.resetPermission();
    for (let perm of roles[r]) {
      role.addPermission(perm);
    }
    role.default = role.name === defaultRole;
    await role.save();
  }
};

RoleSchema.statics.getDefaultRole = async function ():Promise<IRoleDocument>{
  const roles = await Role.findOne({ default: true });
  return roles!;
};

export const Role = model<IRoleDocument, IRoleModel>("Role", RoleSchema);
// export default Role;
