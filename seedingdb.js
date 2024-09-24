const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'jobBoard';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('companies');

  const insertResult =await  collection.insertMany([{ name: "c1" }, { name: "c2" }, { name: "c3" }, { name: "c4" }]);
  console.log('Inserted documents =>', insertResult);
  // db.collection('companies').find().toArray((err, result) => {
  //   if (err) throw err
  //   companiesList = result;
  //   console.log("result" + result)
  // })

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
