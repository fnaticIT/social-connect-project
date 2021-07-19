import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
export default function AllPosts({ username }) {
  const [posts, setPosts] = useState([]);
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
  const h1 = (e) => {
    history.push("/");
  };
  const h2 = (e) => {
    history.push("/home2");
  };
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
       <h1 className="head">
          <button className="head q1" onClick={h1}>
            Recent Queries
          </button>{" "}
          |{" "}
          <button className="head q2" onClick={h2}>
            Most Liked
          </button>
        </h1>
        
          <button className="b ri">Show all posts</button>
        
        {posts
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
