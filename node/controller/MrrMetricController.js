const { getConnection, closeConnection } = require("../config/db");
const MrrMetrics = require('../models/analytics/mrr_metrics')

const getMetrics = async (req, res) => {
    let conn = null;
    let data = null;
    let success = false;
    try {
        conn = await getConnection();
        const repo = conn.getRepository(MrrMetrics);
        data = await repo.find();
        success=true;
    } catch (error) {
        console.log('error saving data', error);
    } finally {
        if (conn) {
            // await closeConnection();
        }
    }
    // return customer;
    res.json({ data, success });
}

module.exports = { getMetrics };