import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3300;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var url = "https://bored-api.appbrewery.com/random"

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${url}`);
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  if ((req.body.type.length === 0) && (req.body.participants.length===0)) {
    url = "https://bored-api.appbrewery.com/random";
    res.redirect("/")
  } else {
    url = "https://bored-api.appbrewery.com/filter?"
    Object.keys(req.body).forEach((key, index) => {
      if (index > 0) {
        url += "&"
      }
      url += `${key}`+"="+`${req.body[key]}`;
    });
    console.log(`${url}`);
    try {
      const response = await axios.get(`${url}`);
      const result = response.data;
      res.render("index.ejs", { data: result[Math.floor(Math.random() * result.length)] });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: "No activities that match your criteria.",
      });
    }
  }  
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
