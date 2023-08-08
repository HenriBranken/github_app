import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import RepoCard from "../../UI/RepoCard/RepoCard";
import Loader from "../../UI/Loader/Loader";
import "./User.css";

// Pictures ---------------------------------------------------------------------------------
import github from "../../../assets/github.png";
import location from "../../../assets/location.png";
import site from "../../../assets/site.png";
import user from "../../../assets/user.png";
// ------------------------------------------------------------------------------------------

// User Information
const User = () => {
  // Strangely, `login` is actually the username of the user.
  const { login } = useParams();

  // Information about the User.
  const [userInfo, setUserInfo] = useState({});

  // A Selection of Repos.
  const [repos, setRepos] = useState([]);

  // The `state`: Whether the page is loading or not.
  const [loading, setLoading] = useState(false);

  // What to do when the component mounts.
  // Set the state of the User Information, and Repositories.
  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        setLoading(true);
        let response = await axios.get(`/get-user/${login}`);
        setUserInfo(response.data.userData); // Object.
        setRepos(response.data.repoData); // Array of objects.
        setLoading(false);
      } catch (error) {
        console.error(
          "An error with the /get-user/:username API endpoint: ",
          error
        );
        return null;
      }
    };
    fetchUserInformation();
  }, [login]);

  return (
    <>
      {loading && <Loader></Loader>}
      {!loading && (
        <div className="container">
          <Link to="/" className="back">
            {" "}
            {/* Navigate back to the Home page. */}
            Go Back
          </Link>
          <div className="user-information">
            <div className="image">
              {" "}
              {/* Display the user Avatar */}
              <img src={userInfo.avatar_url} alt="Avatar of User" />
            </div>
            <div className="user-content">
              {" "}
              {/* Display additionaly data on the user */}
              <h2>{userInfo.login}</h2>
              {userInfo.bio && <p>{userInfo.bio}</p>}
              <div className="more-data">
                <p>
                  <img src={user} alt="Users Icon" /> {userInfo.followers}{" "}
                  Followers. Following {userInfo.following}.
                </p>
                {userInfo.location && (
                  <p>
                    <img src={location} alt="Map Location" />
                    {userInfo.location}
                  </p>
                )}
                {userInfo.blog && (
                  <p>
                    <img src={site} alt="Personal Site" />{" "}
                    <a href={userInfo.blog}>{userInfo.blog}</a>
                  </p>
                )}
                <p>
                  <img src={github} alt="GitHub Profile" />
                  <a data-testid="someURL" href={userInfo.html_url}>
                    View Github Profile
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="user-repos">
            {/* Display repositories created by the user. */}
            {repos && <h2>Repositories & Commit Data</h2>}
            {loading && <Loader></Loader>}
            {!loading && repos ? (
              repos.map((repo) => {
                return <RepoCard repoData={repo} key={repo.id} />;
              })
            ) : (
              <h2>No repositories to display.</h2>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default User;
