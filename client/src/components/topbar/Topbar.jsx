import "./topbar.css";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";

import { ThemeProvider, createGlobalStyle } from "styled-components";
import useTheme from "./useTheme";
import ToggleMode from "./ToggleMode";
import style from "styled-theming";
import { Avatar } from "@material-ui/core";
const getBackground = style("mode", {
  light: "#EEE",
  dark: "#111",
});

const getForeground = style("mode", {
  light: "#111",
  dark: "#EEE",
});

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${getBackground};
  color: ${getForeground};
}
`;

export default function Topbar() {
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const name = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const f = user.isClub;
  const theme = useTheme();
 
  function logout() {
    localStorage.clear();
    history.push("/register");
    window.location.reload();
  }


  const handle = (e) => {
    e.preventDefault();
    const n = name.current.value;
    history.push("/profile/" + n);
  };
  const h = (e) => {
    window.location.reload();
  };
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />

        <div className="topbarContainer2 sticky">
          <div className="topbarLeft">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logo">NITW Connect !</span>
            </Link>
          </div>
          <div className="topbarCenter">
            <div className="searchbar">
              <form onSubmit={handle} className="s">
                <input placeholder="Search for user" className="searchInput" ref={name} />
                <button type="submit" className="bb">
                  <Search className="searchIcon" />
                </button>
              </form>
            </div>
          </div>
       
          <div className="topbarRight">
         
            <div className="topbarIcons">
              <ToggleMode />
            </div>
            <div className="topbarIcons">
              <Link onClick={logout} className="li">
                <h2>Logout</h2>
              </Link>
            </div>
          
            <Link to={`/profile/${user.username}`}>
              <Avatar alt={user.username} src={""} className="topbarImg">
                {user.username.charAt(0)}
              </Avatar>
            </Link>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}
