const express = require("express");

const router = express.Router();
router.use(express.static("public"));

const blogs = [];

router.use(logger);

router.get("/", (req, res) => {
  console.log(req.query.title);
  res.redirect("/");
});

router.get("/new", (req, res) => {
  res.render("blogs/new");
});

router.post("/", (req, res) => {
  console.log("Create Blog");
  blogs.push({
    title: req.body.blogTitle,
    date: new Date().toLocaleString(),
    content: req.body.blogContent,
  });
  console.log("New blogs array values:");
  console.log(blogs);
  res.redirect("/blogs");
});

router.get('/edit/:id', (req, res) => {
    const blogId = req.params.id;
    console.log(`Edit Blog ${blogId}`);
    res.render("blogs/edit", {
        id: blogId,
        blog: blogs[blogId]
    });
});

router
  .route("/:id")
  .get((req, res) => {
    console.log(`[GET] Get blog with ID ${req.params.id}`);
    if (req.blog) {
      res.render("blogs/blog", {
        id: req.params.id,
        blog: blogs[req.params.id],
      });
    } else {
      console.log(`[GET] Error, no blogs yet`);
    }
  })
  .put((req, res) => {
    console.log(`[PUT] Edit blog with ID ${req.params.id}`);
    blogs[req.params.id].title = req.body.blogTitle;
    blogs[req.params.id].date = new Date().toLocaleString();
    blogs[req.params.id].content = req.body.blogContent;
    res.redirect("/blogs");
  })
  .delete((req, res) => {
    console.log(`[DELETE] Delete blog with ID ${req.params.id}`);
    const indexToRemove = req.params.id;
    if (req.params.id < blogs.length) {
      blogs.splice(indexToRemove, 1);
      console.log(`[DELETE] Removed blog[${indexToRemove}].`);
      console.log("[DELETE] New array.");
      console.log(blogs);
      res.redirect("/blogs");
    } else {
      console.log("[DELETE] Nothing to delete.");
    }
  });

router.param("id", (req, res, next, id) => {
  console.log(`URL with ID parameter (${id}) called`);
  if (blogs.length > 0) {
    req.blog = blogs[id];
  }
  next();
});

function logger(req, res, next) {
  console.log("Logger function run:");
  console.log(req.originalUrl);
  next();
}

module.exports = { router, blogs };
