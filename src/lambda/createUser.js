import getModels from './utils/mongo/getModels';

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const payload = JSON.parse(event.body);
  const twitterUsername = payload.twitterUsername.toLowerCase();
  const twitterName = payload.twitterName;
  const twitterId = payload.twitterId;
  const email = payload.email;

  if (!twitterName || !twitterId || !twitterUsername) {
    callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        message: 'Required data missing: name, twitterUsername, twitterId',
      }),
    });

    return;
  }

  const { User } = await getModels();

  const item = new User({
    name: twitterName,
    username: twitterUsername,
    twitterId,
    email,
  });

  await item
    .save()
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(item),
      });
    })
    .catch(error => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(error),
      });
    });
}
