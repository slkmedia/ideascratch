require('dotenv').config();
const mongoose = require('mongoose');

let conn = null;

export async function handler(event, context, callback) {

  context.callbackWaitsForEmptyEventLoop = false;

  if(conn === null){
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

  const id = JSON.parse(event.body).id.trim();

  const ideasModel = conn.model('Idea');

  let ideaItem;

  ideaItem =  await ideasModel.findByIdAndDelete(id);

  ideaItem.save().then(() => {
    callback(null, {
      statusCode: 200,
    });
  }).catch((err) => {
    callback(null, {
      statusCode: 500,
    });
  })

}