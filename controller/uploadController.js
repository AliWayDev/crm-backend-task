class UploadController {
    async getUploadDoctor(req, res) {
        try {
            const { id } = req.params

            console.log(id);

            // let urlTo = __dirname.substring(0, url.lastIndexOf('/'))

            // console.log(urlTo);

            return res.sendFile(`/doctors/${id}.jpg`);

        } catch (err) {
            res.status(500).json({ msg: `${err}` });
        }
    }
}

module.exports = new UploadController();