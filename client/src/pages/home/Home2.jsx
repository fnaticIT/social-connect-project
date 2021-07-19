import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed2 from "../../components/feed/Feed2";

import "./home.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";


export default function Home2() {
  const { user } = useContext(AuthContext);
  
 
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar user={user} />
        <Feed2 />
      </div>
    </>
  );
}
