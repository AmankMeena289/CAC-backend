import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

// Define route and map HTTP method to controller
// Route: POST /api/v1/users/register
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount : 1,
        },
        {
            name : "coverImage",
            maxCount: 1,
        },
    ]),
    registerUser
);

export default router;