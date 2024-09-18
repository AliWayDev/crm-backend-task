import Router from "express";
import userController from "../controller/userController.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";

const apiRouter = new Router();

apiRouter.post("/user/login", userController.login);
apiRouter.post("/user/register", userController.create);

apiRouter.get("/all-users", authMiddleWare, userController.getAll);
apiRouter.put("/users", authMiddleWare, userController.updateMany);
apiRouter.put("/user/:id", authMiddleWare, userController.update);


export default apiRouter;