import Router from "router";
import userconteroller from "../controller/usercontroller.js";
import user from "../controller/userlogin.js";

const router = Router();

// Define your routes here
router.post("/signup", userconteroller);
router.post("/login", user);

export default router;