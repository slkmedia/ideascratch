require('dotenv').config();
const mongoose = require('mongoose');

let conn = null;

export async function handler(event, context, callback) {

  context.callbackWaitsForEmptyEventLoop = false;

  if(conn === null){
    conn = await mongoose.createConnection(
      process.env.MONGO_URI, {
      useNewUrlParser: true,
      bufferCommands: false, 
      bufferMaxEntries: 0 
    });

    conn.model('Idea', {
      name: String,
      upvotes: Number
    });
  }

  const id = JSON.parse(event.body).id.trim();
  
  const ideasModel = conn.model('Idea');
  
  let ideaItem;
  
  await ideasModel.findById(id, function(err, idea){
    idea.upvotes = idea.upvotes + 1;
  
    ideaItem = idea;
  })
  
  ideaItem.save().then(() => {
    console.log('idea Created')
  })
  
  callback(null, {
    statusCode: 200,
  });
}