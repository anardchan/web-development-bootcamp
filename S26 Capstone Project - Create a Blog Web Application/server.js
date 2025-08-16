const express = require("express");
const methodOverride = require('method-override');

const app = express();
const port = 3000;

// Middleware first
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const { router: blogRouter, blogs } = require("./routes/blogs");

app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  if (blogs.length > 0) {
    console.log(`[${req.originalUrl} There are blogs:`);
    console.log(blogs);
  } else {
    console.log("There are no blogs");
  }
  res.render("index", { blogs: blogs });
});

app.use("/blogs", blogRouter);

// Server start
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
