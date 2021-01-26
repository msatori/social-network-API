const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true, 
            required: 'Username is required', 
            trimmed: true
        },

        email : {
            type: String,
            unique: true, 
            required: 'You must enter an email address', 
            match: [/.+@.+\..+/] 
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },

        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;

