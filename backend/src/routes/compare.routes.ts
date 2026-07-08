import { Router } from "express";
import { CompareController } from "../controllers/compare.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

const controller = new CompareController();

router.get(
  "/",
  authenticate,
  controller.compare.bind(controller)
);

export default router;