export const config = {
    development: {
       dialect: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'misael',
       password: 'rosas',
       database: 'cherry',
       logging: true
    },
    production:{
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false
    }
};

//export default config; 