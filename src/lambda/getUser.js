import getModels from './utils/mongo/getModels';

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const username = event.queryStringParameters.username;

  if (!username) {
    callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        message: 'Required data missing: username',
      }),
    });

    return;
  }

  const { User } = await getModels();

  try {
    const users = await User.find({ username });
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
