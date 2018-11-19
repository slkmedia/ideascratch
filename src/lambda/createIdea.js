require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
});

const Idea = mongoose.model('Idea', {
  name: String,
  upvotes: Number
});

export function handler(event, context, callback) {
  let idea  = JSON.parse(event.body).idea.trim();

  const item = new Idea({
    name: idea,
    upvotes: 0
  });

  item.save().then(() => {
    console.log('idea Created')
  })
}
