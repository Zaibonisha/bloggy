const database = require('../../config/database');

async function sluggify(text) {
    if (!text) {
        return null;
    }
    
    let slug = text
      .toLowerCase() // converts to lowercase
      .replace(/[^\w\s-]/g, '') // removes non-word, non-space, and non-hyphen characters
      .replace(/\s+/g, '-') // replaces whitespace with hyphens
      .replace(/-+$/, ''); // removes trailing hyphens
    
    // checks if slug is unique
    const collection = await database.connect('posts');
    let uniqueSlug = slug;
    let counter = 1;
    
    while (await collection.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }
    
    return uniqueSlug;
}

module.exports = sluggify;
