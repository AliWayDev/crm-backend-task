const { Router } = require("express");
const authMiddleWare = require("../middleware/authMiddleWare.js");
const donorController = require("../controller/donorController.js");

const router = Router({ mergeParams: true });

router.route('/')
    .post([authMiddleWare()], donorController.addDonor)
    .get(donorController.getDonors)

router.route('/:id')
    .get(donorController.getDonor)
    .put([authMiddleWare()], donorController.updateDonor)
    .delete([authMiddleWare()], donorController.deleteDonor)

module.exports = router