const { Schema, model } = require('mongoose');
const User = require('./User');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },

        reactionBody: {
            type: String, 
            required: [true, 'You must enter text to create a thought'],
            minlength: 1,
            maxlength: 280
        },

        createdAt : {
            type: Date,
            default: Date.now,
            get: (timeStamp) => moment(timeStamp).format("MM D YYYY LTS")
        },
        
        userName: [
            {  
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            }
        ],

        userId: {
            type: String, 
            required: true,
        }
        

    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            unique: true, 
            required: true, 
            minlength: 1, 
            maxlength: 280
        },

        createdAt : {
            type: Date,
            default: Date.now,
            get: (timeStamp) => moment(timeStamp).format("MM D YYYY LTS")
        },
        
        userName: [
            {  
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            }
        ],

        userId: {
            type: String, 
            required: true,
        },

        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },

        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;