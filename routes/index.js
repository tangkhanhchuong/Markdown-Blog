const express = require('express');
const marked = require("marked");

const Blog = require("../models/blogs");
const { uploadFile } = require("../public/javascripts/helpers/upload.helper");
const { generatePath } = require("../public/javascripts/helpers/path.generator");

const router = express.Router();

router.get("/new", (req, res, next) => {
  res.render("newblog");
})
router.get('/', async (req, res, next) => {
  const blogs = await Blog.find();
  res.render("index", { blogs: blogs })
});

router.post("/new", uploadFile, async (req, res, next) => {
  const { title, description, content } = req.body;

  if (!title || !content) {
    console.log("Invalid title or content");
    return res.redirect("/new");
  }

  const blog = new Blog({
    title: title,
    created: new Date(),
    imagePath: req.file ? generatePath(req.file.path) : null,
    description: description,
    content: marked(content) || content,
  });
  try {
    await blog.save();
    res.redirect("/");
  }
  catch (err) {
    console.log(err);
  }
})

router.get("/:slug", async (req, res, next) => {
  const slug = req.params.slug;
  const blog = await Blog.findOne({ slug: slug });
  if (blog)
    return res.render("blog", { blog: blog });
  res.status(404).send("Not found!");
})

router.delete("/:slug", async (req, res, next) => {
  const slug = req.params.slug;
  await Blog.deleteOne({ slug: slug });
  console.log("Deleted!");
  res.redirect("/");
})

module.exports = router;
