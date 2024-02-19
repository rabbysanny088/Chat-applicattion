import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const firebases = useContext(AuthContext);

  useEffect(() => {
    if (!firebases.isLoggedIn) {
      navigate("/login");
    }
  }, [firebases.isLoggedIn, navigate]);

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
