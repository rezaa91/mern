const express = require('express');
const Post = require('../../../models/posts');
const auth = require('../../../middleware/auth');

const router = express.Router();

// get all posts
router.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) return console.log(err);

        res.json(posts);
    })
})

// post new blog
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

// delete blog
router.delete('/:id', auth, (req, res) => {
    Post.findById(req.params.id)
        .then(post => post.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
