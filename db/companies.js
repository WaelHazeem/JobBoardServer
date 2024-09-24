const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'jobBoard';

async function insertOne( company) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('companies');

  const insertResult =await  collection.insertOne(company);
  console.log('Inserted document =>', insertResult);
  return 'done.';
}
 
module.exports={insertOne};
