import { Router } from "express";
import { welcomeMailController } from "../controllers/welcome-mail";

const router = Router();

const welcomeMailRouter = router.post("/welcome", welcomeMailController);

export { welcomeMailRouter };
