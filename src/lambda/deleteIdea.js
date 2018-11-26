import getModels from './utils/mongo/getModels';

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const payload = JSON.parse(event.body);
  const id = payload.id.trim();

  const { Idea } = await getModels();

  let ideaItem;

  ideaItem = await Idea.findByIdAndDelete(id);

  await ideaItem
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
