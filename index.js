const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const axios = require("axios");

// The unchanging base url that remains the same for every GitHub API operation.
const BASE_URL = "https://api.github.com";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Cross-Origin-Resource-Sharing
app.use(cors());
// Used to secure the Express App.
app.use(helmet());

const PORT = process.env.PORT || 8000;

// GET the users to populate the search data. ------------------------------------------------
// We have three Parameters: [1] username, [2] perPage, [3] page
app.get("/search-users/:username&:perPage&:page", async (req, res, next) => {
  let username = req.params.username;
  let perPage = req.params.perPage || 30;
  let page = req.params.page || 1;

  let response = await axios.get(
    BASE_URL +
      `/search/users?q=${username}+in:login+type:User&page=${page}&per_page=${perPage}`
  );
  let responseData = await response.data;
  res.send(responseData);
});

// GET the user & repo information. ----------------------------------------------------------
app.get("/get-user/:username", async (req, res, next) => {
  let username = req.params.username;

  // Get more data pertaining to the username.
  let responseUsername = await axios.get(BASE_URL + `/users/${username}`);

  // Give array data (one object per repo) on the repositories created by the user.
  let responseRepos = await axios.get(
    BASE_URL + `/users/${username}/repos?sort=updated_at&per_page=5`
  );

  // Join both responses into a single object.
  let response = {
    userData: responseUsername.data,
    repoData: responseRepos.data,
  };

  res.send(JSON.stringify(response));
});

// GET the remaining requests (number) -------------------------------------------------------
// How many calls we can still send to the API.
app.get("/get-limit", async (req, res, next) => {
  let response = await axios.get(BASE_URL + "/rate_limit");
  let responseData = response.data.rate; // This should be a single number.
  res.send(responseData);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
