import Doctor from "../models/Doctor.js";

class doctorController {
  async addDoctor(req, res) {
    try {
      const doctorData = req.body;

      const doctor = await Doctor.create(doctorData);

      return res.json(doctor);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getDoctors(req, res) {
    try {
      const doctors = await Doctor.find();
      return res.json(doctors);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getOneDoctor(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ msg: "Id not found!" });
      }
      const doctor = await Doctor.findById(id);
      return res.json(doctor);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async updateDoctor(req, res) {
    try {
      const doctorData = req.body;
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ msg: "Doctor's Id not found!" });
      }
      const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorData, {
        new: true,
      });
      return res.json(updatedDoctor);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteDoctor(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ msg: "Doctor's Id not found!" });
      }
      await Doctor.findByIdAndRemove(id);
      return res.status(200).json({ msg: "Doctor deleted!" });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new doctorController();
