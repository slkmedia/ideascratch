import getModels from './utils/mongo/getModels';

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const payload = JSON.parse(event.body);
  const idea = payload.idea.trim();
  const userId = payload.userId;

  if (!idea || !userId) {
    callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        message: 'Required data missing: idea, userId',
      }),
    });

    return;
  }

  const { Idea } = await getModels();

  const item = new Idea({
    name: idea,
    upvotes: 0,
    userId,
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
