import express from "express";
import { currentUser } from "../../middlewares/current-user";
import { isLoggedIn } from "../../middlewares/is-loggedin";

const router = express.Router();

router.get("/api/users/currentuser", isLoggedIn, currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
