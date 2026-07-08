import { Router } from "express";
import { AnalyticsController } from "../controllers/analytics.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const controller = new AnalyticsController();

router.get(
  "/dashboard",
  authenticate,
  controller.dashboard.bind(controller)
);

router.get(
  "/companies/:id",
  authenticate,
  controller.company.bind(controller)
);

router.get(
  "/roles/:id",
  authenticate,
  controller.role.bind(controller)
);

router.get(
  "/levels/:id",
  authenticate,
  controller.level.bind(controller)
);

router.get(
  "/locations/:location",
  authenticate,
  controller.location.bind(controller)
);

router.get(
  "/top-companies",
  authenticate,
  controller.topCompanies.bind(controller)
);

export default router;