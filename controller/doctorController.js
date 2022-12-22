const Doctor = require("../models/Doctor.js");
const path = require("path");
const fs = require("fs");

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

  async uploads(req, res) {
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

  async updateUploads(req, res) {
    try {
      const file = req.files.doctorImage
      const { id } = req.params
      const ext = path.extname(file.name)
      const URL = "./public/doctors/" + id + ext

      let urlTo = path.normalize(path.join(__dirname, '..'));
      fs.unlinkSync(urlTo + `/public/doctors/${id}.jpg`)

      file.mv(URL, (err) => {
        if (err) {
          console.log(err);
        }
      })

      return res.json({ msg: "Succesfuly updated!" })
    } catch (err) {
      res.status(500).json({ msg: `${err}` });
    }
  }

  async getUploads(req, res) {
    try {
      const { id } = req.params

      let urlTo = path.normalize(path.join(__dirname, '..'));

      return res.sendFile(urlTo + `/public/doctors/${id}.jpg`);

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

      return res.status(200).json({ data: result });
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

      let urlTo = path.normalize(path.join(__dirname, '..'));
      fs.unlinkSync(urlTo + `/public/doctors/${id}.jpg`)

      return res.status(200).json({ msg: "Doctor deleted!" });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new doctorController();
