const { Like } = require("typeorm");
const { getConnection, closeConnection } = require("../config/db");
const Product = require("../models/product/product");

const getProducts = async (req, res) => {
    let conn = null;
    let customer = null;
    let success = false;
    // console.log(req);
    const name = req.query.name ? req.query.name : '';
    try {
        conn = await getConnection();
        const repo = conn.getRepository(Product);
        customer = await repo.find({ where: { name: Like(`%${name}%`) },  relations: {brand: true, category: true } });
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

module.exports = { getProducts };
