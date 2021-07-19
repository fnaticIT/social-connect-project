import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import img from "../../images/img.png";
import EditIcon from '@material-ui/icons/Edit';
import EditableLabel from "react-inline-editing";
import Notfound from "../../components/Notfound/Notfound";
export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const { user: currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("hell");
    const newPicture = {
      profilePicture:""
    };
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPicture.profilePicture = fileName;
      console.log(newPicture);
      try {
        await axios.post("https://nitw-soc.herokuapp.com/upload", data);
        await axios.put("https://nitw-soc.herokuapp.com/users/updatePicture/"+currentUser._id, newPicture);
        window.location.reload();
      } catch (err) {}
    }
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://nitw-soc.herokuapp.com/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  const hand = (e) =>{
    console.log(file);
    setFile(e.target.files[0]);

  }
  
  return ((!user.username)?<Notfound />:
    <>
      <Topbar />

      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={img} alt="" />
              <div className="im">
              <img className="profileUserImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
              </div>
              <div className="but">
              <form className="shareBottom" onSubmit={submitHandler} id="frm">
                <div className="shareOptions">
                  <label htmlFor="file" className="shareOption">
                    <EditIcon className="be">Edit</EditIcon>
                    <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={hand} />
                  </label>
                </div>
                <button className="li bu" type="submit" id="but">
                  update
                </button>
              </form>
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
  
    </>
  );
  }

