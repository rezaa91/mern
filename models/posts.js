const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date_posted: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('posts', PostsSchema);
