const { MongoClient } = require("mongodb");

const dbURI = process.env.DB_CONNECTION_URL;
const dbClient = new MongoClient(dbURI);

module.exports = dbClient;

// async function run() {
//   try {
//     await dbClient.connect();
//     const database = dbClient.db('rest_api_test');
//     const posts = database.collection('posts');

//     const query = { title: 'Updated title seconf time' };
//     const movie = await posts.findOne(query);
//     console.log(movie);
//   } finally {
//     await dbClient.close();
//   }
// }
// run().catch(console.dir);