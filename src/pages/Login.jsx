import { Spin, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const firebases = useContext(AuthContext);

  useEffect(() => {
    if (firebases.isLoggedIn) {
      navigate("/home");
    }
  }, [firebases, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        message.error(
          "Invalid credentials. Please check your email and password."
        );
      } else {
        console.error("Error during login:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <Spin spinning={loading} tip="loading..">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span className="logo">Lama Chat</span>
            <span className="title">Login</span>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" required />
            <input type="password" placeholder="password" required />
            <input style={{ display: "none" }} type="file" id="file" />
            <button type="submit">Login</button>
          </form>
          <p>
            You do have an account?{" "}
            <Link to="/register">
              <span
                style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
              >
                Register
              </span>
            </Link>
          </p>
        </Spin>
      </div>
    </div>
  );
};

export default Login;
