const Pharmacy = require("../models/Pharmacy")

class pharmacyController {
    async add(req, res) {
        try {
            const body = req.body

            const pharmacy = await Pharmacy.create(body)

            if (!pharmacy) {
                return res.status(400).json({
                    msg: "Can't add this pharmacy!"
                })
            }

            return res.status(201).json({
                msg: "OK",
                pharmacy
            })
        } catch (e) {
            res.status(500).json({
                msg: "Error",
                e
            })
        }
    }

    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 0;
            const limit = parseInt(req.query.limit) || 10;

            const result = {};
            const total = await Pharmacy.countDocuments().exec();

            let startIndex = page * limit;
            const endIndex = (page + 1) * limit;
            result.total = total;

            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit,
                };
            }
            if (endIndex < (await Pharmacy.countDocuments().exec())) {
                result.next = {
                    page: page + 1,
                    limit: limit,
                };
            }

            result.data = await Pharmacy.find()
                .sort("-_id")
                .skip(startIndex)
                .limit(limit)
                .exec();
            result.rowsPerPage = limit;

            return res.status(200).json({
                msg: "OK",
                data: result
            });
        } catch (e) {
            res.status(500).json({
                msg: "Error",
                e
            })
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params

            const pharmacy = await Pharmacy.findById(id)

            if (!pharmacy) {
                return res.status(400).json({
                    msg: "Can't find this pharmacy!"
                })
            }

            return res.status(200).json({
                msg: "OK",
                pharmacy
            })
        } catch (e) {
            res.status(500).json({
                msg: "Error",
                e
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const body = req.body

            const pharmacy = await Pharmacy.findByIdAndUpdate(id, body)

            if (!pharmacy) {
                return res.status(400).json({
                    msg: "Can't update this pharmacy!"
                })
            }

            return res.status(200).json({
                msg: "OK",
                pharmacy
            })
        } catch (e) {
            res.status(500).json({
                msg: "Error",
                e
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params

            await Pharmacy.findByIdAndRemove(id)

            return res.status(200).json({
                msg: "Pharmacy deleted!"
            })
        } catch (e) {
            res.status(500).json({
                msg: "Error",
                e
            })
        }
    }
}

module.exports = new pharmacyController()