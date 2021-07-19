import "./Allclubs.css";
import { Event } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../topbar/Topbar";

export default function Allclubs() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [clubs, setClubs] = useState([]);

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
  return (
    <div>
      <Topbar />
      <div className="club">
        <div className="sidebarWrapper">
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <h1 className="">Clubs</h1>
          </li>
          <ul className="sidebarFriendList">
            {clubs.map(
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
        </div>
      </div>
    </div>
  );
}
