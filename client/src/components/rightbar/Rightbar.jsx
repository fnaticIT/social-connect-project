import "./rightbar.css";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import EditableLabel from "react-inline-editing";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const f=(currentUser.followings.includes(user._id));

  const [followed, setFollowed] = useState(f);
 
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("https://nitw-soc.herokuapp.com/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
  
  const handleClick = async () => {
    try {
  
      if (followed===true) {
        await axios.put(`https://nitw-soc.herokuapp.com/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        setFollowed(!followed);
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`https://nitw-soc.herokuapp.com/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        setFollowed(!followed);
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      
    } catch (err) {}
  };
  
  const handleFocusOut1 = async (text) => {
    const newuser = {
      city: text,
      id: user._id,
    };
    try {
      console.log(newuser);
      await axios.put("https://nitw-soc.herokuapp.com/users/update/city", newuser);
      window.location.reload();
    } catch (err) {
      console.log(500);
    }
  };
  const handleFocusOut2 = async (text) => {
    const newuser = {
      from: text,
      id: user._id,
    };
    try {
      console.log(newuser);
      await axios.put("https://nitw-soc.herokuapp.com/users/update/country", newuser);
      window.location.reload();
    } catch (err) {
      console.log(500);
    }
  };
  const handleFocusOut3 = async (text) => {
    const newuser = {
      relationship: text,
      id: user._id,
    };
    try {
      console.log(newuser);
      await axios.put("https://nitw-soc.herokuapp.com/users/update", newuser);
      window.location.reload();
    } catch (err) {
      console.log(500);
    }
  };
  
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {(followed===true) ? "Unfollow" : "Follow"}
          
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            {user.username === currentUser.username && <EditableLabel text={user.city} labelClassName="myLabelClass" inputClassName="myInputClass" inputWidth="200px" inputHeight="25px" inputMaxLength="50" labelFontWeight="bold" inputFontWeight="bold" onFocusOut={handleFocusOut1} />}
            {user.username !== currentUser.username && <span className="rightbarInfoValue">{user.city}</span>}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Country:</span>
            {user.username === currentUser.username && <EditableLabel text={user.from} labelClassName="myLabelClass" inputClassName="myInputClass" inputWidth="200px" inputHeight="25px" inputMaxLength="50" labelFontWeight="bold" inputFontWeight="bold" onFocusOut={handleFocusOut2} />}
            {user.username !== currentUser.username && <span className="rightbarInfoValue">{user.from}</span>}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            {user.username === currentUser.username && <EditableLabel text={user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married" : "-"} labelClassName="myLabelClass" inputClassName="myInputClass" inputWidth="200px" inputHeight="25px" inputMaxLength="50" labelFontWeight="bold" inputFontWeight="bold" onFocusOut={handleFocusOut3} />}

            {user.username !== currentUser.username && <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married" : "-"}</span>}
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map(
            (friend) =>
              friend.isClub !== true && (
                <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                  <div className="right">
                    <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                    <span className="rightname">{friend.username}</span>
                  </div>
                </Link>
              )
          )}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <ProfileRightbar />
      </div>
    </div>
  );
}
