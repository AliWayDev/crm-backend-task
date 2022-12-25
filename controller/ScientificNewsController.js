const ScientificNews = require("../models/ScientificNews.js");

class scientificNewsController {
    async addNews(req, res) {
        try {
            const newsData = req.body;

            if (!newsData) {
                return res.status(400).json({ msg: "Oops check your payload!" })
            }

            const news = await ScientificNews.create(newsData);

            return res.status(201).json({
                msg: "OK",
                news
            });
        } catch (e) {
            res.status(500).json({ msg: "Server down!" });
        }
    }

    async getNews(req, res) {
        try {
            const news = await ScientificNews.find();

            if (!news) {
                return res.status(404).json({ msg: "Oops News not found!" })
            }

            return res.status(200).json({
                msg: "OK",
                news
            });
        } catch (e) {
            res.status(500).json({ msg: "Server down!" });
        }
    }

    async getOneNews(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ msg: "ID not found!" });
            }

            const news = await ScientificNews.findById(id);

            return res.status(200).json({
                msg: "OK",
                news
            });
        } catch (e) {
            res.status(500).json({ msg: "Server down!" });
        }
    }

    async updatedNews(req, res) {
        try {
            const { id } = req.params;
            const newsData = req.body;

            if (!id) {
                return res.status(400).json({ msg: "ID not found!" });
            }

            const updatedNews = await ScientificNews.findByIdAndUpdate(id, newsData, {
                new: true,
            });

            if (!updatedNews) {
                return res.status(400).json({ msg: "Oops check your payload!" })
            }

            return res.status(200).json({
                msg: "OK",
                updatedNews
            });
        } catch (e) {
            res.status(500).json({ msg: "Server down!" });
        }
    }

    async deleteNews(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ msg: "ID not found!" });
            }

            await ScientificNews.findByIdAndRemove(id);

            return res.status(410).json({ msg: "News deleted!" });
        } catch (e) {
            res.status(500).json({ msg: "Server down!" });
        }
    }
}

module.exports = new scientificNewsController();
