import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
    try {

        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': "Something goes wrong with getting all posts"
        });
    }
}

export const getOne = async (req, res) => {
    try {

        const postId = req.params.id;

        PostModel.findOneAndUpdate({
            _id: postId,
        }, {
            $inc: { viewsCount: 1 }
        }, {
            returnDocument: "after"
        }, (err, doc) => {
            if (err) {
                console.log(err);
                 return res.status(500).json({
                    'message': "Something goes wrong with getting one posts"
                });
            }
            if (!doc) {
                return res.status(404).json({
                    "message": 'Post undefined',
                });
            }
            res.json(doc);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': "Something goes wrong with getting one posts"
        });
    }
}

export const deleteOne = async (req, res) => {
    try {

        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'message': "Something goes wrong with deleting one posts"
                });
            }

            if (!doc) {
                return res.status(404).json({
                    "message": 'Post undefined',
                });
            }

            res.json({
                success: true
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': "Something goes wrong with getting one posts"
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': "Something goes wrong with Post"
        });
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.findOneAndUpdate({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
        });

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': "Something goes wrong update Post"
        });
    }
}