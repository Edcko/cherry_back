import { Sequelize } from "sequelize";
import { config } from "./config.js";

const env = "development";
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


export { db };
