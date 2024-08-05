const { Like } = require("typeorm");
const { getConnection, closeConnection } = require("../config/db");
const QuotationHeader = require("../models/sales/quotation-header");
const QuotationDetail = require("../models/sales/quotation-detail");
const moment = require('moment');


const getRandomText = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}



const addQuotataion = async (req, res) => {
    let conn = null;
    let customer = null;
    let success = false;
    try {
        conn = await getConnection();
        // const { name, address, terms } = req.body;
        const repo = conn.getRepository(QuotationHeader);
        const quotation = req.body;
        quotation.quotation_no = `QTN-${moment().format('YYYY')}-${getRandomText(10)}`;
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

const getQuotations = async (req, res) => {
    let conn = null;
    let customer = null;
    let success = false;
    try {
        conn = await getConnection();
        // const { name, address, terms } = req.body;
        const repo = conn.getRepository(QuotationHeader);
        customer = await repo.find({ order: {
            created_at: "DESC"
        }, relations: { quotation_details: { product: true } }});
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

const getQuotation = async (req, res) => {
    let conn = null;
    let customer = null;
    let success = false;
    console.log(req);
    const id = req.params.id;
    try {
        conn = await getConnection();
        // const { name, address, terms } = req.body;
        const repo = conn.getRepository(QuotationHeader);
        customer = await repo.find({ where: { id },  relations: { quotation_details: { product: true } }});
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


const addQuotataionDetails = async (req, res) => {
    let conn = null;
    let customer = null;
    let success = false;
    try {
        conn = await getConnection();
        // const { name, address, terms } = req.body;
        const repo = conn.getRepository(QuotationDetail);
        customer = await repo.save(req.body.items);
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


module.exports = { addQuotataion, addQuotataionDetails, getQuotations, getQuotation };
