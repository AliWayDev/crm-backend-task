const Department = require("../models/Department")
const Doctor = require("../models/Doctor")

class departmentController {
    async add(req, res) {
        try {
            const departmentData = req.body

            if (!departmentData) {
                return res.status(404).json({
                    msg: "Oops check your payload!"
                })
            }

            const department = await Department.create(departmentData)

            return res.status(201).json({
                msg: "OK",
                department
            })
        } catch (err) {
            res.status(500).json({
                msg: "Server dawn!" + err
            })
        }
    }

    async getAll(req, res) {
        try {
            const departments = await Department.find().populate("doctors")

            if (!departments) {
                return res.status(404).json({
                    msg: "Sorry, there is no any Departments!"
                })
            }

            return res.status(200).json({
                msg: "OK",
                departments
            })
        } catch (err) {
            res.status(500).json({
                msg: "Server dawn!"
            })
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).json({
                    msg: "ID not found!"
                })
            }

            const department = await Department.findById(id).populate("doctors")

            if (!department) {
                return res.status(404).json({
                    msg: `Sorry, there is no any Department with this id: ${id}!`
                })
            }

            return res.status(200).json({
                msg: "OK",
                department
            })
        } catch (err) {
            res.status(500).json({
                msg: "Server dawn!"
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const departmentData = req.body

            if (!id) {
                return res.status(400).json({
                    msg: "ID not found!"
                })
            }

            if (!departmentData) {
                return res.status(404).json({
                    msg: "Oops check your payload!"
                })
            }

            const department = await Department.findByIdAndUpdate(id, departmentData)

            return res.status(200).json({
                msg: "OK",
                department
            })
        } catch (err) {
            res.status(500).json({
                msg: "Server dawn!" + err
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).json({
                    msg: "ID not found!"
                })
            }

            await Department.findByIdAndRemove(id)

            return res.status(410).json({
                msg: "Department deleted!",
            })
        } catch (err) {
            res.status(500).json({
                msg: "Server dawn!"
            })
        }
    }
}

module.exports = new departmentController();
