require('dotenv').config();
const mongoose = require('mongoose');

let conn = null;

export async function handler(event, context, callback) {

  context.callbackWaitsForEmptyEventLoop = false;

  let idea  = JSON.parse(event.body).idea.trim();

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
  
  const item = new ideasModel({
    name: idea,
    upvotes: 0
  });

  item.save().then(() => {
    callback(null, {
      statusCode: 200,
    });
  }).catch((err) => {
    callback(null, {
      statusCode: 500,
    });
  })
  

}
