const { Router } = require("express");
const authMiddleWare = require("../middleware/authMiddleWare.js");
const PatcientController = require("../controller/patcientController.js");

const router = Router({ mergeParams: true });

router.route('/')
    .post([authMiddleWare()], PatcientController.add)
    .get(PatcientController.getAll)

router.route('/:id')
    .get(PatcientController.getOne)
    .put([authMiddleWare()], PatcientController.update)
    .delete([authMiddleWare()], PatcientController.delete)

module.exports = router