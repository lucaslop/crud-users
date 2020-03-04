import { Router } from "express";
import userController from "./app/controllers/userController";

const routes = Router();

routes.get("/users", userController.index);
routes.get("/users/:id", userController.index);
routes.post("/users", userController.store);
routes.put("/users/:id", userController.up);
routes.delete("/users/:id", userController.delete);

export default routes;
