const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },

        reactionBody: {
            type: String, 
            required: true,
            maxlength: 280
        },
        
        username: [
            {  
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            }
        ],

        createdAt : {
            type: Date,
            default: Date.now,
            get: (timeStamp) => moment(timeStamp).format("MM D YYYY LTS")
        },
        
    },
    {
        toJSON: {
            getters: true
        },
        id: false
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
        
        username: [
            {  
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            }
        ],


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

module.exports = { Thought };