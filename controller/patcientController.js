const Patcient = require("../models/Patcient")

class patcientController {
    async add(req, res) {
        try {
            const patcientData = req.body

            if (!patcientData) {
                return res.status(400).json({ msg: "Oops check your payload!" })
            }

            const patcient = await Patcient.create(patcientData)

            return res.status(201).json({
                msg: "OK",
                patcient
            })
        } catch (err) {
            return res.status(500).json({
                msg: "Oops server dawn!"
            })
        }
    }

    async getAll(req, res) {
        try {
            const patcients = await Patcient.find()

            if (!patcients) {
                return res.status(404).json({ msg: "Pacients not found!" })
            }

            return res.status(200).json({
                msg: "OK",
                patcients
            })
        } catch (err) {
            return res.status(500).json({
                msg: "Oops server dawn!"
            })
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).json({ msg: "Id not found!" })
            }

            const pacient = await Patcient.findById(id)

            if (!pacient) {
                return res.status(404).json({ msg: `Pacient with this id: ${id} not found!` })
            }

            return res.status(200).json({
                msg: "OK",
                pacient
            })
        } catch (err) {
            return res.status(500).json({
                msg: "Oops server dawn!"
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const patcientData = req.body

            if (!id) {
                return res.status(400).json({ msg: "Id not found!" })
            }

            if (!patcientData) {
                return res.status(400).json({ msg: "Oops check your payload!" })
            }

            const pacient = await Patcient.findByIdAndUpdate(id, patcientData)

            return res.status(200).json({
                msg: "OK",
                pacient
            })
        } catch (err) {
            return res.status(500).json({
                msg: "Oops server dawn!"
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).json({ msg: "Id not found!" })
            }

            await Patcient.findByIdAndRemove(id)

            return res.status(410).json({ msg: "Donor deleted!" });
        } catch (err) {
            return res.status(500).json({
                msg: "Oops server dawn!"
            })
        }
    }
}

module.exports = new patcientController();