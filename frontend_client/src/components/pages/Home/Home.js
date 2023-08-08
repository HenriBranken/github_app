import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../../UI/UserCard/UserCard"; // A user candidate.
import Loader from "../../UI/Loader/Loader";
import "./Home.css";

const Home = () => {
  // The text typed into the `input` field.
  const [query, setQuery] = useState("");

  // Users fetched from the API:
  const [users, setUsers] = useState([]);

  // Selected Page.
  const [page, setPage] = useState(1);

  // Per Page:
  const [perPage, setPerPage] = useState(30);

  // Rate Limit:
  const [limit, setLimit] = useState(0);

  // A state: Whether the page is loading or not.
  const [loading, setLoading] = useState(false);

  // Grabbing the value from the Input.
  const handleQueryInput = (event) => {
    const value = event.target.value;
    setQuery(value);
    localStorage.setItem("query", value);
  };

  // Decrement the Page Number.
  const handlePreviousPage = () => {
    setPage((page) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  // Increment the Page Number.
  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  // Control the number of users to display per page.
  const handlePerPage = (event) => {
    const value = +event.target.value;
    setPerPage(value);
  };

  // Fetch User data from API Endpoint based on the parameters `query`, `perPage`, `page`.
  const fetchUsers = async () => {
    if (!query) return null;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/search-users/${query}&${perPage}&${page}`
      );
      setLoading(false);
      return data.items; // Data of interest lives in the `items` entry.
    } catch (error) {
      console.error("FETCHUSERS error: ", error);
      return null;
    }
  };

  // How many API requests the IP client can still consume.
  const getRequestsRemaining = async () => {
    try {
      const response = await axios.get(`/get-limit`);
      let remaining = response.data.remaining;
      setLimit(+remaining);
    } catch (error) {
      console.error("Error with the API request limit: ", error);
    }
  };

  // When the user has clicked on the `Search` Button.
  // Fetch the Users, and then Set the users.  Also call getRequestsRemaining().
  const handleSearchUsers = async (event) => {
    event.preventDefault(); // Prevent a form submission.
    const items = await fetchUsers();
    setUsers(items);

    getRequestsRemaining();
  };

  // What to do when the component mounts.
  // Get the "old" users if possible.
  // Recalculate the number of requests available.
  useEffect(() => {
    const displayUsersOnChange = async () => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    };
    displayUsersOnChange();

    getRequestsRemaining();

    try {
      let q = localStorage.getItem("query");
      if (q) {
        setQuery(q);
      }
    } catch (error) {}
  }, [page, perPage, query]);

  return (
    <div className="container">
      <div className="search-form" data-testid="search-form">
        <h2>Search GitHub User</h2>
        <form>
          <input
            value={query}
            type="text"
            onChange={handleQueryInput}
            placeholder="Enter User Name"
          />
          <button onClick={handleSearchUsers}>Search</button>
          <p className="rate">{limit}/60</p>
        </form>
      </div>
      <>
        {loading && <Loader></Loader>}
        {!loading && (
          <div className="search-results">
            <div className="more-options">
              <label>
                <small>Per Page&nbsp;&nbsp;</small>{" "}
                {/* How many users to display per page */}
                <select onChange={handlePerPage}>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </label>
              <div className="pagination">
                <button onClick={handlePreviousPage}>{page}</button>
                <button onClick={handleNextPage}>{page + 1}</button>
              </div>
            </div>
            {users &&
              users.map((user) => {
                return <UserCard user={user} key={user.id} />;
              })}
          </div>
        )}
      </>
    </div>
  );
};

export default Home;
