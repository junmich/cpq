const { getConnection, closeConnection } = require("../config/db");
const Customer = require('../models/core/customer')

const addCustomer = async (req, res) => {
    let conn = null;
    let customer = null;
    let success = false;
    try {
        conn = await getConnection();
        const repo = conn.getRepository(Customer);
        customer = await repo.save(req.body);
        success=true;
    } catch (error) {
        console.log('error saving data', error);
    } finally {
        if (conn) {
            // await closeConnection();
        }
    }
    // return customer;
    res.json({ data: customer, success });
}

module.exports = { addCustomer };