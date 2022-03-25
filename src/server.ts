import express from "express";
import swaggerUi from "swagger-ui-express";
import { dataSource } from "./database";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

// import "./database";

dataSource.initialize();

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(router);

app.listen(3333, () => {
  console.log("server rodando em 3333");
});
