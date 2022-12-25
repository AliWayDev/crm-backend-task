const File = require("../models/File")
const path = require('path')
const fs = require('fs')

class UploadController {
    async uploads(req, res) {
        try {
            const file = req.files.doctorImage
            const { id } = req.params
            const ext = path.extname(file.name)
            const URL = "./public/" + id + ext

            await File.create({ _id: id, name: `${id}${ext}` })

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
            const URL = "./public/" + id + ext

            let urlTo = path.normalize(path.join(__dirname, '..'));

            const files = await File.findById(id)

            fs.unlinkSync(urlTo + `/public/${files.name}`)

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

            const files = await File.findById(id)

            return res.sendFile(urlTo + `/public/${files.name}`);

        } catch (err) {
            res.status(500).json({ msg: `${err}` });
        }
    }
}

module.exports = new UploadController();