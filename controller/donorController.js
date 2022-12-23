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
      const donors = await Donor.find();

      return res.status(200).json({
        msg: "OK",
        donors
      });
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

      return res.status(410).json({ msg: "Donor deleted!" });
    } catch (e) {
      res.status(500).json({ msg: "Server down!" });
    }
  }
}

module.exports = new donorController();
