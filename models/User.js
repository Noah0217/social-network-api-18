const { Schema, model } = require('mongoose');

//Users Schema
const UsersSchema = new Schema(
    
{
    username: {
      type: String,
      Unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      Unique: true,
      trim: true
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    },
    friends: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
}

);

//counts friends
const User = model("User", UsersSchema);

UsersSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

  module.exports = User;