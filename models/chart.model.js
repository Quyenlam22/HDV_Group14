const mongoose = require("mongoose")

const chartSchema = new mongoose.Schema({
    revenue: Number,
    sold: Number,
}, {
    timestamps: true
})
const Chart = mongoose.model('Chart', chartSchema, "charts")

module.exports = Chart