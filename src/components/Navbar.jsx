import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLog = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar">
      <span className="logos">Lama chat</span>

      <div className="user">
        {currentUser && currentUser.photoURL && (
          <img src={currentUser.photoURL} alt="User" />
        )}{" "}
        {currentUser && currentUser.displayName && (
          <span>{currentUser.displayName}</span>
        )}{" "}
        <button className="logout" onClick={handleLog}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
