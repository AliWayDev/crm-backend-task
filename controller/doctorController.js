const Department = require("../models/Department.js");
const Doctor = require("../models/Doctor.js");

class doctorController {
  async addDoctor(req, res) {
    try {
      const doctorData = req.body;

      let doctor = await Doctor.create(doctorData);

      await Department.findByIdAndUpdate(doctor.departmentId, {
        $push: {
          doctors: [
            doctor
          ]
        }
      })

      return res.status(201).json({ msg: "OK", doctor });
    } catch (err) {
      res.status(500).json({ msg: `${err}` });
    }
  }

  async getDoctors(req, res) {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;

      const result = {};
      const total = await Doctor.countDocuments().exec();

      let startIndex = page * limit;
      const endIndex = (page + 1) * limit;
      result.total = total;

      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      if (endIndex < (await Doctor.countDocuments().exec())) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }

      result.data = await Doctor.find()
        .sort("-_id")
        .skip(startIndex)
        .limit(limit)
        .exec();
      result.rowsPerPage = limit;

      return res.status(200).json({ msg: "OK", data: result });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getOneDoctor(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ msg: "Id not found!" });
      }

      const doctor = await Doctor.findById(id);

      if (!doctor) {
        return res.status(400).json({ msg: "Doctor not found!" });
      }

      return res.status(200).json({
        msg: "OK",
        doctor,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async updateDoctor(req, res) {
    try {
      const body = req.body;
      const { id } = req.params;

      const doctor = await Doctor.findById(id)

      if (!doctor) {
        return res.status(400).json({ msg: "Doctor's Id incorrect!" });
      }

      await Department.updateOne({
        _id: doctor.departmentId
      }, {
        $pull: {
          doctors: {
            $in: [doctor._id]
          }
        },
        multi: true
      });

      const updatedDoctor = await Doctor.findByIdAndUpdate(id, body);

      if (!updatedDoctor) {
        return res.status(400).json({ msg: "Oops check your payload!" })
      }

      await Department.findByIdAndUpdate(body.departmentId, {
        $push: {
          doctors: [
            updatedDoctor
          ]
        }
      })

      return res.status(200).json({
        msg: "OK",
        updatedDoctor
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  async deleteDoctor(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ msg: "Doctor's Id not found!" });
      }

      const doctor = await Doctor.findById(id)

      await Department.updateOne({
        _id: doctor.departmentId
      }, {
        $pull: {
          doctors: {
            $in: [doctor._id]
          }
        },
        multi: true
      });

      await Doctor.findByIdAndRemove(id);

      return res.status(200).json({ msg: "Doctor deleted!" });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new doctorController();
