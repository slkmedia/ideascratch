import getModels from './utils/mongo/getModels';

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const userId = event.queryStringParameters.userId;

  if (!userId) {
    callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        message: 'Required data missing: userId',
      }),
    });

    return;
  }

  const { Idea } = await getModels();

  Idea.find({ userId })
    .then(ideas => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(ideas || []),
      });
    })
    .catch(error => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(error),
      });
    });
}
