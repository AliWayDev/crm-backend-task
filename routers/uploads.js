const { Router } = require("express");
const uploadController = require("../controller/uploadController.js");


const router = Router({ mergeParams: true });

router.route('/doctor/:id')
    .get(uploadController.getUploadDoctor)

module.exports = router
