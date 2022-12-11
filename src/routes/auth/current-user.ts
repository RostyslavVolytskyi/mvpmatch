import express from "express";
import { ROLES } from "../../constants";
import { authRole } from "../../middlewares/auth-role";
import { currentUser } from "../../middlewares/current-user";

const router = express.Router();

router.get(
    "/api/users/currentuser",
    authRole(ROLES.SELLER),
    currentUser,
    (req, res) => {
        res.send({ currentUser: req.currentUser || null });
    }
);

export { router as currentUserRouter };
