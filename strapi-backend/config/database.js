const path = require('path');

module.exports = () => ({
    connection: {
        client: 'postgres',
        connection: {
            host: 'localhost',
            port: 5432,
            database: 'db',            // ��� ����
            user: 'kurs',              // ��� ������������
            password: '123123',        // ����� � ��� ������ ���� ������, �� undefined
            ssl: false,
            schema: 'public',
        },
        pool: { min: 2, max: 10 },
    },
});