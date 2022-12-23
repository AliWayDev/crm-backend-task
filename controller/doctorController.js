const Doctor = require("../models/Doctor.js");

class doctorController {
  async addDoctor(req, res) {
    try {
      const doctorData = req.body;

      let doctor = await Doctor.create(doctorData);

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
      const doctorData = req.body;
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ msg: "Doctor's Id not found!" });
      }

      const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorData, {
        new: true,
      });

      if (!updatedDoctor) {
        return res.status(400).json({ msg: "Oops check your payload!" })
      }

      return res.status(200).json({
        msg: "OK",
        updatedDoctor
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteDoctor(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ msg: "Doctor's Id not found!" });
      }

      await Doctor.findByIdAndRemove(id);

      return res.status(410).json({ msg: "Doctor deleted!" });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new doctorController();

 // let urlTo = path.normalize(path.join(__dirname, '..'));
      // fs.unlinkSync(urlTo + `/public/doctors/${id}.jpg`)


// async uploads(req, res) {
  //   try {
  //     const file = req.files.doctorImage
  //     const { id } = req.params
  //     const ext = path.extname(file.name)
  //     const URL = "./public/doctors/" + id + ext

  //     file.mv(URL, (err) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //     })

  //     return res.json({ msg: "Succesfuly uploaded!" })
  //   } catch (err) {
  //     res.status(500).json({ msg: `${err}` });
  //   }
  // }

  // async updateUploads(req, res) {
  //   try {
  //     const file = req.files.doctorImage
  //     const { id } = req.params
  //     const ext = path.extname(file.name)
  //     const URL = "./public/doctors/" + id + ext

  //     let urlTo = path.normalize(path.join(__dirname, '..'));
  //     fs.unlinkSync(urlTo + `/public/doctors/${id}.jpg`)

  //     file.mv(URL, (err) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //     })

  //     return res.json({ msg: "Succesfuly updated!" })
  //   } catch (err) {
  //     res.status(500).json({ msg: `${err}` });
  //   }
  // }

  // async getUploads(req, res) {
  //   try {
  //     const { id } = req.params

  //     let urlTo = path.normalize(path.join(__dirname, '..'));

  //     return res.sendFile(urlTo + `/public/doctors/${id}.jpg`);

  //   } catch (err) {
  //     res.status(500).json({ msg: `${err}` });
  //   }
  // }