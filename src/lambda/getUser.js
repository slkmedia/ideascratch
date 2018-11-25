require('dotenv').config();
const mongoose = require('mongoose');

let conn = null;

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const username = event.queryStringParameters.username;

  if (!username) {
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

    conn.model('User', {
      name: String,
      username: String,
      twitterId: String,
    });
  }
  const usersModel = conn.model('User');

  try {
    const users = await usersModel.find({ username });
    const user = users.length !== 0 ? users[0] : null;

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(user),
    });
  } catch (error) {
    callback(null, {
      statusCode: 404,
      body: JSON.stringify({ message: 'User not found' }),
    });
  }
}
