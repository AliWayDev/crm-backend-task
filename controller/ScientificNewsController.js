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
            const page = parseInt(req.query.page) || 0;
            const limit = parseInt(req.query.limit) || 10;

            const result = {};
            const total = await ScientificNews.countDocuments().exec();

            let startIndex = page * limit;
            const endIndex = (page + 1) * limit;
            result.total = total;

            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit,
                };
            }
            if (endIndex < (await ScientificNews.countDocuments().exec())) {
                result.next = {
                    page: page + 1,
                    limit: limit,
                };
            }

            result.data = await ScientificNews.find()
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

            return res.status(200).json({ msg: "News deleted!" });
        } catch (e) {
            res.status(500).json({ msg: "Server down!" });
        }
    }
}

module.exports = new scientificNewsController();
