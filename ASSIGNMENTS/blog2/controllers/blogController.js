const Blog = require("../models/Blog");
const NodeCache = require("node-cache");
const blogCache = new NodeCache();

const blogController = {
  getAllBlogs: async (req, res) => {
    try {
      // Check if the data is in the cache
      const cachedBlogs = blogCache.get("allBlogs");

      if (cachedBlogs) {
        // If data is in the cache, retrieve and return it
        console.log("Retrieving from cache");
        res.json({ blogs: cachedBlogs });
      } else {
        // If data is not in the cache, fetch from Blog
        const blogs = await Blog.find();

        // Convert Mongoose documents to plain JavaScript objects
        const blogsData = blogs.map((blog) => blog.toObject());

        // Store the fetched data in the cache
        blogCache.set("allBlogs", blogsData);
        console.log("Data stored in cache:", blogsData);

        res.json({ blogs: blogsData });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createBlog: async (req, res) => {
    try {
      const { title, content, category, reviews } = req.body;
      const authorId = req.cookies.userId;
      const newBlog = await Blog.create({
        title,
        content,
        author: authorId,
        category,
      });

      if (reviews && Array.isArray(reviews)) {
        newBlog.reviews = reviews.map((review) => ({
          user: authorId,
          rating: review.rating,
        }));
        await newBlog.save();
      }

      res.json({ message: "Blog created successfully.", blog: newBlog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getBlogByAuthorId: async (req, res) => {
    try {
      const authorId = req.params.authorId;
      const blogs = await Blog.find({ author: authorId });
      res.json({ blogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getBlogsByCategory: async (req, res) => {
    try {
      // Controller logic for fetching blog posts based on a specified category
      const category = req.params.category;

      // Use 'await Blog.find({ category })' for database queries
      const blogs = await Blog.find({ category });

      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getBlogBySAuthorId: async (req, res) => {
    try {
      const authorId = req.params.authorId;
      const blogs = await Blog.find();

      // Check if the user is subscribed
      if (req.user && req.user.subscribed) {
        // User is subscribed, provide access to the entire content
        res.json({ blogs });
      } else {
        // User is not subscribed, provide access to 'blogTitle' only
        const filteredBlogs = blogs.map((blog) => ({
          _id: blog._id,
          title: blog.title,
        }));
        res.json({ blogs: filteredBlogs });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = blogController;
