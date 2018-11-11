// show object spread works, i.e. babel works
const ideas = [
  {
    _id: 'ljsdfljsdk',
    name: 'my crazy idea',
    upvotes: 299
  },
  {
    _id: 'dsfisdjfsd',
    name: 'my crazier idea',
    upvotes: 229
  }
]
export function handler(event, context, callback) {
  console.log('queryStringParameters', event.queryStringParameters);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: ideas })
  });
}