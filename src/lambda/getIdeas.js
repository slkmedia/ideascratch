require('dotenv').config();
const mongoose = require('mongoose');

let conn = null;

export async function handler(event, context, callback) {

  context.callbackWaitsForEmptyEventLoop = false;

  if(conn === null) {
    conn = await mongoose.createConnection(
      process.env.MONGO_URI, {
      useNewUrlParser: true,
      bufferCommands: false, 
      bufferMaxEntries: 0 
    });

    conn.model('Idea', {
      name: String,
      upvotes: Number
    });
  }
  const ideasModel = conn.model('Idea');

  const doc = await ideasModel.find();

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: doc })
  });

}
