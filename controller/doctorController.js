const Doctor = require("../models/Doctor.js");
const path = require("path");

class doctorController {
  async addDoctor(req, res) {
    try {
      const doctorData = req.body;

      let doctor = await Doctor.create(doctorData)

      return res.json(doctor);
    } catch (err) {
      res.status(500).json({ msg: `${err}` });
    }
  }

  async imgUpload(req, res) {
    try {
      const file = req.files.doctorImage
      const { id } = req.params
      const ext = path.extname(file.name)
      const URL = "./public/doctors/" + id + ext

      file.mv(URL, (err) => {
        if (err) {
          console.log(err);
        }
      })

      return res.json({ msg: "Succesfuly uploaded!" })
    } catch (err) {
      res.status(500).json({ msg: `${err}` });
    }
  }

  async getUploads(req, res) {
    try {
      const { id } = req.params

      const URL = '/public/doctors/' + `${id}` + ".jpg"

      console.log(URL);

      return res.sendFile(URL);
    } catch (err) {
      res.status(500).json({ msg: `${err}` });
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

      const newObj = {
        doctorImage: getImage(doctor._id, res),
        ...JSON.parse(JSON.stringify(doctor)),
      };

      return res.json(newObj);
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

module.exports = new doctorController();
