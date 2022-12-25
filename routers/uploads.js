const { Router } = require("express");
const uploadController = require("../controller/uploadController.js");


const router = Router({ mergeParams: true });

router.route('/:id')
    .get(uploadController.getUploads)
    .put(uploadController.updateUploads)
    .post(uploadController.uploads)

module.exports = router
