import React, { useState, useEffect } from "react";
import axios from "axios";
let dateModule = require("../../../helpers/helperFunctions.js");

export const CommitCard = ({ url }) => {
  // The endpoint to all the commits of a repository by a user.
  const COMMIT_API = url + "/commits";

  const [commitsArray, setCommitsArray] = useState([]);

  // The number of latest commits to fetch.
  const N = 5;

  // What to do when the component mounts:
  // Get commit data from the COMMIT_API.
  // Extract the first 5 objects present in the array.
  // Set the `commitsArray` property.
  useEffect(() => {
    const fetchCommitInformation = async () => {
      try {
        const response = await axios.get(COMMIT_API);
        setCommitsArray(response.data.slice(0, N));
      } catch (error) {
        console.error("Problem with the Commit API fetch: ", error);
      }
    };
    fetchCommitInformation(); // Implement the async function.
  }, []);

  return (
    <>
      <ul>
        {commitsArray.map((commit) => {
          return (
            <li key={commit.sha}>
              <small>
                <span style={{ fontWeight: "bolder" }}>
                  [{dateModule.formattedDate(commit.commit.author.date)}]
                </span>
              </small>
              &nbsp;&nbsp;
              {commit.commit.message}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CommitCard;
