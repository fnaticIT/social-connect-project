import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [allposts, allsetPosts] = useState([]);
  const [all, allset] = useState(false);
  const [dis,setdis] = useState("Show all Posts")
  const { user } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username ? await axios.get("https://nitw-soc.herokuapp.com/posts/profile/" + username) : await axios.get("https://nitw-soc.herokuapp.com/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://nitw-soc.herokuapp.com/posts/posts/all");
      allsetPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  const h1 = (e) => {
    history.push("/");

  };
  const h2 = (e) => {
    history.push("/home2");
   
  };
  const handle = (e) => {
    //  console.log(all);
    allset(!all);
    if(dis==="Show all Posts")
    setdis("Only friends Posts")
    else
    setdis("Show all Posts")
    //console.log(all);
  };
  return (
    <div className="feed">
      <div className="feedWrapper">

        {(!username || username === user.username) && <Share />}
        <div className="uppp">
       
        <h1 className="head">
          <button className="head q1" onClick={h1}>
            Recent Queries
          </button>{" "}
          |{" "}
          <button className="head q2" onClick={h2}>
            Most Liked
          </button>
        </h1>
        <button className="ri" onClick={handle}>
          {dis}
        </button>
</div>
        

        {all
          ? allposts
              //.sort((a,b)=>a.likes.length<b.likes.length?1:-1)
              .map((p) => (
                <div>
                  <Post key={p._id} post={p} />
                </div>
              ))
          : posts
              //.sort((a,b)=>a.likes.length<b.likes.length?1:-1)
              .map((p) => (
                <div>
                  <Post key={p._id} post={p} />
                </div>
              ))}
      </div>
    </div>
  );
}
