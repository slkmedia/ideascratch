require('dotenv').config();
const mongoose = require('mongoose');

let conn = null;

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const idea = JSON.parse(event.body).idea.trim();
  const userId = JSON.parse(event.body).userId;

  if (!userId) {
    callback(null, {
      statusCode: 500,
    });
  }

  if (conn === null) {
    conn = await mongoose.createConnection(process.env.MONGO_URI, {
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });

    conn.model('Idea', {
      userId: String,
      name: String,
      upvotes: Number,
      twitterId: String,
      twitterName: String,
    });
  }

  const ideasModel = conn.model('Idea');

  const item = new ideasModel({
    name: idea,
    upvotes: 0,
    userId,
  });

  item
    .save()
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(item),
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 500,
      });
    });
}
