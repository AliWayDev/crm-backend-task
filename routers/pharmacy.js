const { Router } = require("express");
const authMiddleWare = require("../middleware/authMiddleWare.js");
const pharmacyController = require("../controller/pharmacyController.js");

const router = Router({ mergeParams: true });

router.route('/')
    .post([authMiddleWare()], pharmacyController.add)
    .get(pharmacyController.getAll)

router.route('/:id')
    .get(pharmacyController.getOne)
    .put([authMiddleWare()], pharmacyController.update)
    .delete([authMiddleWare()], pharmacyController.delete)

module.exports = router