const service = require('../services/postsService')

async function index(request, response) {
    try {
        const results = await service.getPosts()
        response.json({ 'data': results })
    } catch (error) {
        console.log(`Error querying database: ${error}`)
        response.status(500).json({ 'data': { 'error': 'Error querying database' } })
    }
}

async function show(request, response) {
    try {
        const result = await service.getPost(request.params.post)
        response.json({ 'data': result })
    } catch (error) {
        console.log(`Error querying database: ${error}`)
        response.status(error.statusCode ?? 500).json({ 'data': { 'error': `${error.message}` } })
    }
}

async function store(request, response) {
    try {
        const result = await service.createPost(request.body)
        response.status(201).json({ 'data': result })
    } catch (error) {
        console.log(`Error querying database: ${error}`)
        response.status(error.statusCode ?? 500).json({ 'data': { 'error': `${error.message}` } })
    }
}

async function update(request, response) {
    try {
        const result = await service.updatePost(request.params.id, request.body)
        response.status(200).json({ 'data': result })
    } catch (error) {
        console.log(`Error querying database: ${error}`)
        response.status(error.statusCode ?? 500).json({ 'data': { 'error': `${error.message}` } })
    }
}

async function deletePost(request, response) {
    try {
        await service.deletePost(request.params.id)
        response.status(200).json({ 'data': { 'message': 'Post deleted successfully' } })
    } catch (error) {
        console.log(`Error querying database: ${error}`)
        response.status(error.statusCode ?? 500).json({ 'data': { 'error': `${error.message}` } })
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    delete: deletePost
}
