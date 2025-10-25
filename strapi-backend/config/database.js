const path = require('path');

module.exports = () => ({
    connection: {
        client: 'postgres',
        connection: {
            host: 'localhost',
            port: 5432,
            database: 'db',            // им€ базы
            user: 'kurs',              // им€ пользовател€
            password: '123123',        // ¬ажно Ч это должна быть строка, не undefined
            ssl: false,
            schema: 'public',
        },
        pool: { min: 2, max: 10 },
    },
});