import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes";
import companyRoutes from "./routes/company.routes";
import roleRoutes from "./routes/role.routes";
import levelRoutes from "./routes/level.routes";
import compensationRoutes from "./routes/compensation.routes";
import analyticsRoutes from "./routes/analytics.routes";
import searchRoutes from "./routes/search.routes";
import compareRoutes from "./routes/compare.routes";

import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Compensation Intelligence API 🚀",
    });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/levels", levelRoutes);
app.use("/api/v1/compensations", compensationRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/compare", compareRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(errorHandler);

export default app;