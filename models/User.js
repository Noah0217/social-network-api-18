const { Schema, model } = require('mongoose');


//Users Schema
const UserSchema = new Schema(
    
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
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
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
const User = model("User", UserSchema);

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

  module.exports = User;