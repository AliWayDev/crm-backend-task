const Router = require("express");
const doctorController = require("../controller/doctorController.js");
const donorController = require("../controller/donorController.js");
const authMiddleWare = require("../middleware/authMiddleWare.js");
const path = require('path');

const apiRouter = new Router();

// Doctors
apiRouter.post("/doctors", [authMiddleWare()], doctorController.addDoctor);
apiRouter.post("/doctors/upload/:id", [authMiddleWare()], doctorController.imgUpload);
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

//Avatar
apiRouter.get("/doctors/uploads/:id", doctorController.getUploads);


module.exports = apiRouter;
