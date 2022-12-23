const { Router } = require("express");
const authMiddleWare = require("../middleware/authMiddleWare.js");
const doctorController = require("../controller/doctorController.js");

const router = Router({ mergeParams: true });

router.route('/')
    .post([authMiddleWare()], doctorController.addDoctor)
    .get(doctorController.getDoctors)


router.route('/:id')
    .get(doctorController.getOneDoctor)
    .put([authMiddleWare()], doctorController.updateDoctor)
    .delete([authMiddleWare()], doctorController.deleteDoctor)

module.exports = router
