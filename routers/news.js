const { Router } = require("express");
const authMiddleWare = require("../middleware/authMiddleWare.js");
const NewsController = require("../controller/newsController.js");

const router = Router({ mergeParams: true });

router.route('/')
    .post([authMiddleWare()], NewsController.addNews)
    .get(NewsController.getNews)

router.route('/:id')
    .get(NewsController.getOneNews)
    .put([authMiddleWare()], NewsController.updatedNews)
    .delete([authMiddleWare()], NewsController.deleteNews)

module.exports = router