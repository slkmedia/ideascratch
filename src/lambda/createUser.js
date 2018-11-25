require('dotenv').config();
const mongoose = require('mongoose');

let conn = null;

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const twitterUsername = JSON.parse(event.body).twitterUsername;
  const twitterName = JSON.parse(event.body).twitterName;
  const twitterId = JSON.parse(event.body).twitterId;

  if (!twitterName || !twitterId || !twitterUsername) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Required data missing: name, twitterUsername, twitterId',
      }),
    });

    return;
  }

  if (conn === null) {
    conn = await mongoose.createConnection(process.env.MONGO_URI, {
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });

    conn.model('User', {
      name: String,
      username: String,
      twitterId: String,
    });
  }

  const usersModel = conn.model('User');

  const item = new usersModel({
    name: twitterName,
    username: twitterUsername,
    twitterId,
  });

  item
    .save()
    .then(() => {
      callback(null, {
        statusCode: 200,
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 500,
      });
    });
}
