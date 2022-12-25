const { Router } = require("express");
const authMiddleWare = require("../middleware/authMiddleWare.js");
const departmentController = require("../controller/departmentController.js");

const router = Router({ mergeParams: true });

router.route('/')
    .post([authMiddleWare()], departmentController.add)
    .get(departmentController.getAll)


router.route('/:id')
    .get(departmentController.getOne)
    .put([authMiddleWare()], departmentController.update)
    .delete([authMiddleWare()], departmentController.delete)

module.exports = router
