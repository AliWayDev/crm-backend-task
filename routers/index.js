const { Router } = require("express");
const doctorRoutes = require('./doctor')
const authRoutes = require('./auth')
const donorRoutes = require('./donor')
const uploadRoutes = require('./uploads')
const newsRoutes = require('./news')
const patcientsRoutes = require('./patcients')

const router = Router({ mergeParams: true });

router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/donors', donorRoutes);
router.use('/uploads', uploadRoutes);
router.use('/news', newsRoutes);
router.use('/patcients', patcientsRoutes);

module.exports = router;