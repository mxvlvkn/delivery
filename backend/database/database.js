import {} from 'dotenv/config'
import PoolApi from 'pg';
const Pool = PoolApi.Pool

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME
});

export default pool;