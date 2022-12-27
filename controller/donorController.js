const Donor = require("../models/Donor.js");

class donorController {
  async addDonor(req, res) {
    try {
      const donorData = req.body;

      const donor = await Donor.create(donorData);

      return res.status(201).json({
        msg: "OK",
        donor
      });
    } catch (e) {
      res.status(500).json({ msg: "Server down!" });
    }
  }

  async getDonors(req, res) {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;

      const result = {};
      const total = await Donor.countDocuments().exec();

      let startIndex = page * limit;
      const endIndex = (page + 1) * limit;
      result.total = total;

      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      if (endIndex < (await Donor.countDocuments().exec())) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }

      result.data = await Donor.find()
        .sort("-_id")
        .skip(startIndex)
        .limit(limit)
        .exec();
      result.rowsPerPage = limit;

      return res.status(200).json({ msg: "OK", data: result });
    } catch (e) {
      res.status(500).json({ msg: "Server down!" });
    }
  }

  async getDonor(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ msg: "ID not found!" });
      }

      const donor = await Donor.findById(id);

      return res.status(200).json({
        msg: "OK",
        donor
      });
    } catch (e) {
      res.status(500).json({ msg: "Server down!" });
    }
  }

  async updateDonor(req, res) {
    try {
      const { id } = req.params;
      const donorData = req.body;

      if (!id && !donorData) {
        return res.status(400).json({ msg: "ID not found!" });
      }

      const updatedDonor = await Donor.findByIdAndUpdate(id, donorData, {
        new: true,
      });

      if (!updatedDonor) {
        return res.status(400).json({ msg: "Oops check your payload!" })
      }

      return res.status(200).json({
        msg: "OK",
        updatedDonor
      });
    } catch (e) {
      res.status(500).json({ msg: "Server down!" });
    }
  }

  async deleteDonor(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ msg: "ID not found!" });
      }

      await Donor.findByIdAndRemove(id);

      return res.status(200).json({ msg: "Donor deleted!" });
    } catch (e) {
      res.status(500).json({ msg: "Server down!" });
    }
  }
}

module.exports = new donorController();
