import React from "react";
import "./navBar.scss";
import { NavLink, withRouter, useHistory } from "react-router-dom";
import Logo from "../../assets/Logo/stonkers-logo.svg";
import SearchIcon from "@mui/icons-material/Search";

function NavBar(props) {
  const history = useHistory();
  // handles search submit depending on page location
  const submitted = (e) => {
    if (props.location.pathname === "/watchlist") {
      redirectHome(e);
    } else {
      handleSubmit(e);
    }
    e.preventDefault();
  };

  const redirectHome = async (e) => {
    await props.redirect(e.target.searchedStock.value.toUpperCase());
    history.push("/main");
    e.target.searchedStock.value = "";
  };

  const handleSubmit = async (e) => {
    await props.getQuote(e.target.searchedStock.value.toUpperCase());
    e.target.searchedStock.value = "";
  };

  const handleSignout = () => {
    sessionStorage.clear();
  };

  return (
    <div className="navBar">
      <div className="nav">
        <div className="nav__left">
          <NavLink to="/main" className="nav__logo">
            <img className="nav__img" src={Logo} alt="stonkers logo"></img>
          </NavLink>
          <NavLink
            to="/main"
            className="nav__link nav__link--home"
            tabIndex={1}
          >
            Home
          </NavLink>
          <NavLink
            to="/watchlist"
            className="nav__link nav__link--watchlist"
            tabIndex={2}
          >
            Watchlist
          </NavLink>
        </div>
        <NavLink
          to="/login"
          className="nav__link nav__link--signout"
          tabIndex={3}
          onClick={handleSignout}
        >
          Sign out
        </NavLink>
      </div>
      <div className="navBar-bottom">
        <div className="search">
          <SearchIcon color="action" />
          <form className="search__form" onSubmit={submitted}>
            <input
              className="search__input"
              type="text"
              name="searchedStock"
              tabIndex={4}
              placeholder="Search for stocks by symbol..."
            />
          </form>
        </div>
        <div className="mobile-links">
          <NavLink to="/main" className="mobile__link btns__link--home">
            Home
          </NavLink>
          <NavLink
            to="/watchlist"
            className="mobile__link btns__link--watchlist"
          >
            Watchlist
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default withRouter(NavBar);
