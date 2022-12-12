// import axios from "axios";
import Donor from "../models/Donor.js";

// const getl = async () => {
//   await axios.get('https://app-eight-pi.vercel.app/donors').then(res => console.log(res.data))
// }

// getl()

class donorController {
  async addDonor(req, res) {
    try {
      const donorData = req.body;
      const donor = await Donor.create(donorData);

      return res.json(donor);
    } catch (e) {
      res.status(500).json({ msg: "Server down!" });
    }
  }
  async getDonors(req, res) {
    try {
      const donors = await Donor.find();

      return res.json(donors);
    } catch (e) {
      res.status(500).json({ msg: "Server down!" });
    }
  }
  async getDonor(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ msg: "ID not found!" });
      }

      const donor = await Donor.findById(id);

      return res.json(donor);
    } catch (e) {
      res.status(500).json({ msg: "Server down!" });
    }
  }
  async updateDonor(req, res) {
    try {
      const { id } = req.params;
      const donorData = req.body;

      if (!id && !donorData) {
        res.status(400).json({ msg: "ID not found!" });
      }

      const updatedDonor = await Donor.findByIdAndUpdate(id, donorData, {
        new: true,
      });

      return res.json(updatedDonor);
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

      return res.json({ msg: "Donor deleted!" });
    } catch (e) {
      res.status(500).json({ msg: "Server down!" });
    }
  }
}

export default new donorController();

/** const express = require('express')
const app = express();
const port = 3000

const posts = [
  {
    id: 1,
    title: {
      ru: 'hello world',
      kuz: 'hello world',
    },
    content: {
      uz: 'hello worldwefwefwe',
      ru: 'hello worldfwefwefwe',
      kuz: 'hello worldwefwefwefwefwefwefwe',
    },
  },
  {
    id: 1,
    title: {
      uz: 'hello world',
      ru: 'hello world',
      kuz: 'hello world',
    },
    content: {
      ru: 'hello worldfwefwefwe',
      kuz: 'hello worldwefwefwefwefwefwefwe',
    },
  },
  {
    id: 1,
    title: {
      uz: 'hello world',
      ru: 'hello world',
      kuz: 'hello world',
    },
    content: {
      uz: 'hello worldwefwefwe',
      kuz: 'hello worldwefwefwefwefwefwefwe',
    },
  }

]

function serializePosts(lang, data) {
  const res = {}
  for (let key in data) {

    if (typeof data[key] == 'object') {
      if (data[key][lang]){
        data[key] = data[key][lang]
      }
    }
  }
  console.log(data);
  return data;
}

app.get('/posts', (req, res) => {
  const lang = req.query['lang'];

  const serializedPosts = posts.map((post) => serializePosts(lang, post));
  res.json(serializedPosts);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) **/
