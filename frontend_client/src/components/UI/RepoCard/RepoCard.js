import { Link } from "react-router-dom";
import "./RepoCard.css";
import CommitCard from "../CommitCard/CommitCard";
let dateModule = require("../../../helpers/helperFunctions.js");

// `RepoCard` is a container for a single Repository by a User.
export const RepoCard = ({ repoData }) => {
  const { html_url, name, description, language, created_at } = repoData;

  return (
    <div className="repo">
      <div
        className="repo-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        {/* Link to the Repository on GitHub. */}
        <Link to={html_url} style={{ display: "inline-block" }}>
          {" "}
          <h3 style={{ fontWeight: "bolder" }}>{name}</h3>
        </Link>{" "}
        {/* When the Repository was created */}
        <small style={{ display: "inline-block", textAlign: "right" }}>
          <span style={{ fontWeight: "bolder" }}>Created</span>:&nbsp;&nbsp;
          {dateModule.formattedDate(created_at)}
        </small>
      </div>

      {/* A description of the Repository. */}
      {description && (
        <p
          style={{
            margin: "0.5rem 0",
            backgroundColor: "#333",
            color: "#fff",
            padding: "0.5rem",
            borderRadius: "7px",
          }}
        >
          <span style={{ fontWeight: "bolder" }}>About</span>: &nbsp;&nbsp;
          {description}
        </p>
      )}
      {/* Fetch the Commit information via the `CommitCard`. */}
      <CommitCard url={repoData.url} />
      {language && (
        // What language the project is written in.
        <small>
          Written in <span className="language">{language}</span>
        </small>
      )}
    </div>
  );
};

export default RepoCard;
