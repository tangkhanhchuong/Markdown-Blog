const mongoose = require('mongoose');
const slugify = require("slugify")

const Schema = mongoose.Schema;

const blogsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

blogsSchema.pre("validate", function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
})

const Blog = mongoose.model("blogs", blogsSchema)

module.exports = Blog;