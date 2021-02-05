const { Schema, Types, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },

        reactionBody: {
            type: String, 
            required: true,
            minlength: 1,
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

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
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
                type: String,
                required: true
            }
        ],


        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },

        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;