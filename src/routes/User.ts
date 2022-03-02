import { UserModel, RoleModel } from "./../models/index";
import { Router } from "express";

const router = Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName) {
    return res
      .status(400)
      .json({ success: false, message: "First name required" });
  }
  if (!lastName) {
    return res
      .status(400)
      .json({ success: false, message: "Last name required" });
  }
  if (!email) {
    res.status(400).json({ success: false, message: "Email required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Password required" });
  }
  const role = await RoleModel.findOne({ default: true });
  const newUser = await (
    await UserModel.create({ ...req.body, role })
  ).populate("role", "name permissions");
  await newUser.hashPassword(password);
  const { password: _pass, ...user } = newUser._doc;
  return res.status(200).json({ success: true, user });
});
/**
 * Get all roles
 */
router.get("/", async (req, res) => {
  const users = await UserModel.find().populate("role", "name permissions");
  if (users.length < 1) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ users });
});

export default router;
