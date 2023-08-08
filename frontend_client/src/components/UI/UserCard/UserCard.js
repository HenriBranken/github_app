import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.css";

// `UserCard` display results of one user from the Search Run.
const UserCard = ({ user }) => {
  // Strangely, `login` is actually the `username` of the user.
  const { avatar_url, login, id, html_url } = user; // Object Destructuring.
  return (
    <div className="user">
      {/* The Avatar of the User */}
      <div className="image">
        <img src={avatar_url} alt="The Profile Presentation of the User" />
      </div>
      {/* Container for all User Information on the Right-Hand Side of the Avatar. */}
      <div className="user-info">
        {/* The UserName & ID */}
        <h2>{login}</h2>
        <small>ID: {id}</small>
        {/* Link to the GitHub Profile of the User. */}
        <Link
          className="outside"
          to={html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profile
        </Link>
        {/* Link to the User's Page */}
        <Link
          className="inside"
          to={`/user/${login}`}
          rel="noopener noreferrer"
        >
          User's Page
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
