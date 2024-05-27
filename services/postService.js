const ULID = require('ulid');
const database = require('../../config/database');
const sluggify = require('../utilities/sluggify');
const NotFound = require('../errors/NotFound');
const { format } = require('date-fns');

async function getPosts() {
    const collection = await database.connect('posts');
    return await collection.find({}).toArray();
}

async function getPost(identifier) {
    const collection = await database.connect('posts');
    const result = await collection.findOne({ id: identifier });

    if (result === null) {
        throw new NotFound("Post not found.");
    }

    return result;
}

async function createPost(postData) {
    const collection = await database.connect('posts');
    const today = new Date();
    const slug = await sluggify(postData.title);

    const result = await collection.insertOne({
        id: ULID.ulid(),
        title: postData.title,
        slug: slug,
        author: postData.author,
        body: postData.body,
        is_featured: postData.is_featured ?? false,
        created_at: format(today, 'yyyy-MM-dd'),
        category: postData.category ?? "Uncategorized"
    });

    return result;
}

async function updatePost(id, postData) {
    const collection = await database.connect('posts');
    const post = await collection.findOne({ id });

    if (!post) {
        throw new NotFound("Post not found.");
    }

    const updates = {};
    if (postData.title) {
        updates.title = postData.title;
        updates.slug = await sluggify(postData.title);
    }
    if (postData.body) {
        updates.body = postData.body;
    }
    if (postData.author) {
        updates.author = postData.author;
    }
    if (postData.is_featured !== undefined) {
        updates.is_featured = postData.is_featured;
    }
    if (postData.category) {
        updates.category = postData.category;
    }

    const result = await collection.updateOne({ id }, { $set: updates });
    return result.modifiedCount > 0 ? await collection.findOne({ id }) : null;
}

async function deletePost(id) {
    const collection = await database.connect('posts');
    const result = await collection.deleteOne({ id });

    if (result.deletedCount === 0) {
        throw new NotFound("Post not found.");
    }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};
