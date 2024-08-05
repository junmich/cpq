const { getConnection, closeConnection } = require("../config/db");
const User = require('../models/core/user')
const UserOrganization = require('../models/core/user_organization')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addUser = async (req, res) => {
    let conn = null;
    let user = null;
    let success = false;
    try {
        conn = await getConnection();
        const userRepo = conn.getRepository(User);
        const userOrgRepo = conn.getRepository(UserOrganization);
        const body = req.body;
        const password = await bcrypt.hash(body.password, 10);
        const userObject = {
            name: body.name,
            email: body.email,
            password
        }
        user = await userRepo.save(userObject);
        userOrg = {
            user_org_key: `${body.org_id}_${user.id}`,
            org_id: body.org_id,
            user_id: user.id
        }
        await userOrgRepo.save(userOrg);
        success=true;
    } catch (error) {
        console.log('error saving data', error);
    } finally {
        if (conn) {
            // await closeConnection();
        }
    }
    // return customer;
    res.json({ data: user, success });
}

const login = async (req, res) => {
    let conn = null;
    let token = null;
    let success = false;
    try {
        conn = await getConnection();
        const userRepo = conn.getRepository(User);
        const body = req.body;
        console.log(body);
        const userAccount = await userRepo.findOneBy({ email: body.email });
        if (!userAccount) {
            res.json({ success: false, message: "Invalid username or password."});
        }
        console.log(userAccount);
        const passwordMatch = await bcrypt.compare(body.password, userAccount.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "Invalid username or password."});
            // return false;
        } else {
            token = jwt.sign({ userId: userAccount.id }, 'secret123', { expiresIn: '1h' });
            success=true;
            const { name, email } = userAccount;
            return res.json({ token, success, name, email });
        }
        
    } catch (error) {
        console.log('error saving data', error);
        res.json({ success: false, message: "Something went wrong."});
    } finally {
        if (conn) {
            // await closeConnection();
        }
    }
}

module.exports = { addUser, login };