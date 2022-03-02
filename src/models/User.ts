import { Schema, model, SchemaTypes } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDocument, IUserModel } from "./types";

const UserSchema: Schema<IUserDocument> = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select:false
  },
  role: {
    type: SchemaTypes.ObjectId,
    ref: "Role",
    required: true,
  },
});

UserSchema.virtual("fullName").get(function (this: IUserDocument) {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods.hashPassword = async function (
  password: string
): Promise<void> {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  this.password = passwordHash;
  await this.save()
};
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

UserSchema.statics.findByEmail = async function (email: string) {
  const document = await this.findOne({ email });
  return document;
};

export const User = model<IUserDocument, IUserModel>("User", UserSchema);
// export default User;
