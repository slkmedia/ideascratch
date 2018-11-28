import getConnection from './getConnection';

export default async function getModels() {
  const mongoose = await getConnection();

  const Idea =
    mongoose.models.Idea ||
    mongoose.model('Idea', {
      userId: String,
      name: String,
      upvotes: Number,
      twitterId: String,
      twitterName: String,
    });

  const User =
    mongoose.models.User ||
    mongoose.model('User', {
      name: String,
      username: String,
      twitterId: String,
      email: String,
    });

  return { Idea, User };
}
