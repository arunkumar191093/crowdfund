const mongoose = require('mongoose');

const mongoURI = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const uri = mongoURI.toString().replace('<username>', username).replace('<password>', password);

let connection

async function run() {
  try {
    console.log('DB initiated');
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName
    });
    connection = mongoose.connection;

    connection.once('open', () => {
      console.log("MongoDB database connection established successfully");
    })
    mongoose.connection.on('error', (err) => {
      console.log('Error while connecting to DB', err)
    });

  }
  catch (err) {
    console.log('error while connecting to DB', err)
    await connection.close();
  }
}

run().catch(console.dir);
