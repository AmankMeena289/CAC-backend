import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

// Define route and map HTTP method to controller
router.route("/register").post(registerUser);

export default router;