const express = require('express');
const { getConnection } = require('./config/db');
const cors = require('cors');
const organization = require('./models/core/organization');

const app = express ();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

const running  = 'test';
const quote = require('./router/quote');
const product = require('./router/product');
const core = require('./router/core');
const account = require('./router/account');
const analytics = require('./router/analytics');

app.use('/api/quotation', quote);
app.use('/api/product', product);
app.use('/api/core', core);
app.use('/api/account', account);
app.use('/api/analytics', analytics);
app.get('/api', async (request, response) => {

    // let conn;
    // try {
    //     conn = await getConnection();
    //     const repo = conn.getRepository(organization);
    //     const org = {
    //         name: 'Demo Org',
    //         address: 'Quezon City'
    //     };
    //     await repo.save(org);
    // } catch (error) {
    //     console.log(error);
    // } finally {
    //     if (conn) {
    //     // await closeConnection();
    //     }
    // }

    // const bcrypt = require('bcrypt');
    // const hashedPassword = await bcrypt.hash('test123', 10);
    // const passwordMatch = await bcrypt.compare('test123d', hashedPassword);
    // console.log(hashedPassword, passwordMatch);
    
    const status = {
       'status': running
    };
    
    response.send(status);
 });

 app.get('/api/all', async (req, res) => {
    const status = {
        'status': running
     };
     
     response.send(status);
 });

 app.post('/api/form', async (req, res) => {
    const status = {
        'status': running
     };
     
     response.send(status);
 });


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});