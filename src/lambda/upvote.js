import getModels from './utils/mongo/getModels';

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const payload = JSON.parse(event.body);
  const id = payload.id.trim();

  const { Idea } = await getModels();

  let ideaItem;

  await Idea.findById(id, function(error, idea) {
    if (error) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(error),
      });
      return;
    }

    idea.upvotes = idea.upvotes + 1;
    ideaItem = idea;
  });

  ideaItem
    .save()
    .then(() => {
      callback(null, {
        statusCode: 200,
      });
    })
    .catch(error => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(error),
      });
    });
}
