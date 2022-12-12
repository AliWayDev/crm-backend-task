import Router from "express";
import doctorController from "../controller/doctorController.js";
import donorController from "../controller/donorController.js";
import authMiddleWare from "../middleware/authMiddleWare.js";

const apiRouter = new Router();

// Doctors
apiRouter.post("/doctors", [authMiddleWare()], doctorController.addDoctor);
apiRouter.get("/doctors", doctorController.getDoctors);
apiRouter.get("/doctors/:id", doctorController.getOneDoctor);
apiRouter.put("/doctors/:id", [authMiddleWare()], doctorController.updateDoctor);
apiRouter.delete("/doctors/:id", [authMiddleWare()], doctorController.deleteDoctor);

//Donors
apiRouter.post("/donors", [authMiddleWare()], donorController.addDonor)
apiRouter.get("/donors", donorController.getDonors)
apiRouter.get("/donors/:id", donorController.getDonor)
apiRouter.put("/donors/:id", [authMiddleWare()], donorController.updateDonor)
apiRouter.delete("/donors/:id", [authMiddleWare()], donorController.deleteDonor)


export default apiRouter;
