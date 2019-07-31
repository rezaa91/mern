const express = require('express');
const Post = require('../../../models/posts');

const router = express.Router();

router.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) return console.log(err);

        res.json(posts);
    })
})

router.post('/', (req, res) => {
    const { title, body, author } = req.body;

    const post = new Post({title, body, author});
    post.save((err, blog) => {
        if (err) {
            res.json({error: err});
        }

        res.json({success: 'Post successfully added'});
    })
})

module.exports = router;
