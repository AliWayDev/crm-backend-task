const { Router } = require("express");
const doctorRoutes = require('./doctor')
const authRoutes = require('./auth')
const donorRoutes = require('./donor')
const uploadRoutes = require('./uploads')
const newsRoutes = require('./news')
const scientificNewsRoutes = require('./scientificNews')
const patcientsRoutes = require('./patcients')
const departmentsRoutes = require('./departments')
const pharmacyRoutes = require('./pharmacy')

const router = Router({ mergeParams: true });

router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/donors', donorRoutes);
router.use('/uploads', uploadRoutes);
router.use('/news', newsRoutes);
router.use('/scientificnews', scientificNewsRoutes);
router.use('/patcients', patcientsRoutes);
router.use('/departments', departmentsRoutes);
router.use('/pharmacy', pharmacyRoutes);

module.exports = router;