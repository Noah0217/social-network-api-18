const { Schema, model, Types } = require('mongoose');
//utils date format
const dateFormat = require('../utils/dateFormat');

//Reaction Schema
const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId
      },
      reactionBody: {
        type: String,
        required: true,
        max: 280 //max character length for body
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
    },
      {
        toJSON: {
        getters: true,
        },
      }
    );

//Thought Schema
const ThoughtSchema = new Schema (
        {
    thoughtText: {
        type: String,
        required: true,
        max: 280
            },
     createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') //date format
            },
     username: {
        type: String,
        required: true,
        ref: 'User'
            },
    reactions: [ReactionSchema],
        },
        {
     toJSON: {
        virtuals: true,
        getters: true
          },
        id: false
      }
    );

    //counts reactions
    const Thought = model('Thought', ThoughtSchema);

    ThoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
      });

      module.exports = Thought;
    