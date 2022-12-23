const { Router } = require("express");
const authMiddleWare = require("../middleware/authMiddleWare.js");
const ScientificNewsController = require("../controller/ScientificNewsController.js");

const router = Router({ mergeParams: true });

router.route('/')
    .post([authMiddleWare()], ScientificNewsController.addNews)
    .get(ScientificNewsController.getNews)

router.route('/:id')
    .get(ScientificNewsController.getOneNews)
    .put([authMiddleWare()], ScientificNewsController.updatedNews)
    .delete([authMiddleWare()], ScientificNewsController.deleteNews)

module.exports = router