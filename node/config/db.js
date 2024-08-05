const typeorm = require("typeorm");


const dotenv = require('dotenv');
dotenv.config();


const getConnection = async () => {
    const connection = new typeorm.DataSource({
        name: 'cpq',
        type: 'postgres',
        replication: {
            master: {
                host: process.env.PG_HOST ? process.env.PG_HOST : 'db',
                port: process.env.PG_PORT ? process.env.PG_PORT : '5432',
                username: process.env.PG_USER ? process.env.PG_USER : 'cpq',
                password: process.env.PG_PASSWORD ? process.env.PG_PASSWORD : 'password1234',
                database: process.env.PG_DB ? process.env.PG_DB : 'cpq'
            },
            slaves: [
                {
                    host: process.env.PG_HOST ? process.env.PG_HOST : 'db',
                    port: process.env.PG_PORT ? process.env.PG_PORT : '5432',
                    username: process.env.PG_USER ? process.env.PG_USER : 'cpq',
                    password: process.env.PG_PASSWORD ? process.env.PG_PASSWORD : 'password1234',
                    database: process.env.PG_DB ? process.env.PG_DB : 'cpq'
                }
            ]
        },
        synchronize: true,
        entities: [
            require('../models/core/organization.js'),
            require('../models/core/customer.js'),
            require('../models/core/user.js'),
            require('../models/core/user_organization.js'),
            require('../models/sales/quotation-header.js'),
            require('../models/sales/quotation-detail.js'),
            require('../models/product/product.js'),
            require('../models/product/brand.js'),
            require('../models/product/category.js'),
            require('../models/analytics/mrr_metrics.js'),
        ]
    });

    // console.log(connection, 'connection');

    return new Promise((res, rej) => {
        connection.initialize()
            .then((data) => {
                console.log('connections is initialized.');
                res(data);
            })
            .catch((err) => {
                console.log(err);
                rej(err);
            })
    });
}

const closeConnection = async () => {
    await typeorm.closeConnection();
}

module.exports = {
    getConnection,
    closeConnection
}
