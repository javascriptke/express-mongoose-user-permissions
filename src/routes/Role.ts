import { RoleModel } from "./../models/index";
import { Router } from "express";

const router = Router();

router.post("/insert", async (req, res) => {
  await RoleModel.insertRoles();
  const roles = await RoleModel.find();
  return res.status(200).json({ roles });
});
/**
 * Get all roles
 */
router.get("/", async (req, res) => {
  const roles = await RoleModel.find();
  if (roles.length < 1) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ roles });
});

export default router;
