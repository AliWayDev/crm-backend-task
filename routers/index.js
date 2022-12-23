const { Router } = require("express");
const doctorRoutes = require('./doctor')
const authRoutes = require('./auth')
const donorRoutes = require('./donor')

const router = Router({ mergeParams: true });

router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/donors', donorRoutes);

module.exports = router;