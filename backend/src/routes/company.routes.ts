import { Router } from "express";
import { CompanyController } from "../controllers/company.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const controller = new CompanyController();

router.get("/", controller.getAll.bind(controller));

router.get("/:id", controller.getById.bind(controller));

router.post("/", authenticate, controller.create.bind(controller));

router.put("/:id", authenticate, controller.update.bind(controller));

router.delete("/:id", authenticate, controller.delete.bind(controller));

export default router;