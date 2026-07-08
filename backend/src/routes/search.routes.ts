import { Router } from "express";
import { SearchController } from "../controllers/search.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

const controller = new SearchController();

router.get("/", authenticate, controller.search.bind(controller));

export default router;