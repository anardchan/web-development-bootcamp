import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(express.static('public'))

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random/");
    console.log(result.data)
    res.render("index.ejs", { 
        secret: result.data.secret,
        user: result.data.username
     });
  } catch (error) {
    console.log(`[get-secret] error = ${error}`);
    res.status(500);
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
