import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "abernardc";
const yourPassword = "bernard";
const yourAPIKey = "655476b8-19a7-42fb-9ba4-11da00afc2cb";
const yourBearerToken = "1af61d89-a218-4f1a-92a8-6280e067f9db";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  axios
    .get(API_URL + "random")
    .then((response) => {
      console.log(response.data);
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/basicAuth", (req, res) => {
  axios
    .get(API_URL + "all", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    })
    .then((response) => {

      console.log(response.data);
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    })
    .catch((error) => {
      console.log(error);
      // res.render("index.ejs", { content: response.status + " " + });clear
      res.status(404).send(error.message);
    });
});

app.get("/apiKey", (req, res) => {
  axios
    .get(API_URL + `filter?score=5&apiKey=${yourAPIKey}`)
    .then((response) => {
      console.log(response.data);
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error.message);
    });
});

app.get("/bearerToken", (req, res) => {
  axios
    .get(API_URL + "secrets/3", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    })
    .catch((error) => {
      console.log(error);
      // res.render("index.ejs", { content: response.status + " " + });clear
      res.status(404).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
