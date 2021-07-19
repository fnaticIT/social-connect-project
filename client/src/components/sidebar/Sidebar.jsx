import "./sidebar.css";
import { RssFeed, Event } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import storage from "local-storage-fallback";
export default function Sidebar(user) {
  // const savedTheme = storage.getItem("theme");
  //const tt = JSON.parse(savedTheme);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [clubs, setClubs] = useState([]);
const history = useHistory();
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("https://nitw-soc.herokuapp.com/users/usersList");
        setClubs(friendList.data);
        console.log(clubs);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
const hp=()=>{
  history.push("/allclubs")
}
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          
          <RssFeed className="sidebarIcon" />
            <Link to="/clubs" className="side">
              <span className="sidename">My Clubs</span>
            </Link>
          <li className="sidebarListItem"> 
          </li>
          <RssFeed className="sidebarIcon" />
            <Link to="/friends" className="side">
              <span className="sidename">My Friends</span>
            </Link>
            <li className="sidebarListItem"> 
          </li>
          <RssFeed className="sidebarIcon" />
            <Link to="/friends" className="side">
              <span className="sidename">My Followers</span>
            </Link>
            <li className="sidebarListItem"> 
          </li>
          <RssFeed className="sidebarIcon" />
            <Link to="/friends" className="side">
              <span className="sidename">Announcements</span>
            </Link>
        </ul>

        <hr className="sidebarHr" />
        <li className="sidebarListItem">
          <Event className="sidebarIcon" />
          <span className="headside">Clubs</span>
        </li>
        <ul className="sidebarFriendList">
          {clubs.slice(0,2).map(
            (friend) =>
              friend.isClub && (
                <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                  <div /*className={true ? "rightbarFollowing" : "rightbarFollowing2"}*/>
                    <div>
                      <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                    </div>
                    <div>
                      <span className="name">{friend.username}</span>
                    </div>
                  </div>
                </Link>
              )
          )}
        </ul>
        <button className="b sidebarButton" onClick={hp}>ALL CLUBS</button>
        <hr className="sidebarHr" />
        <li className="sidebarListItem">
          <Event className="sidebarIcon" />
          <span className="headside">Alumini</span>
        </li>

        <ul className="sidebarFriendList">
          {clubs.slice(0,2).map(
            (friend) =>
              friend.isClub && (
                <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                  <div /*className={true ? "rightbarFollowing" : "rightbarFollowing2"}*/>
                    <div>
                      <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                    </div>
                    <div>
                      <span className="name">{friend.username}</span>
                    </div>
                  </div>
                </Link>
              )
          )}
        </ul>
        <button className="b sidebarButton" onClick={hp}>ALL Aluminis</button>
      </div>
    </div>
  );
}
