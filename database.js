const { MongoClient } = require("mongodb");

const dbURI = process.env.DB_CONNECTION_URL;
const dbClient = new MongoClient(dbURI);

module.exports = dbClient;