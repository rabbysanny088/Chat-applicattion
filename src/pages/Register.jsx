import { Spin, message } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth, db, storage } from "../firebase";
import Add from "../img/undraw_Male_avatar_g98d.png";
const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const firebases = useContext(AuthContext);

  useEffect(() => {
    if (firebases.isLoggedIn) {
      navigate("/home");
    }
  }, [firebases, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
          });
          navigate("/");
        }
      );
    } catch (error) {
      if (error.code === "auth/weak-password") {
        message.error("Password should be at least 6");
      } else if (error.code === "auth/email-already-in-use") {
        message.error("email-already-in-use");
      }
      console.log(error);
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
            <span className="title">Register</span>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="display name" required />
            <input type="email" placeholder="email" required />
            <input type="password" placeholder="password" required />
            <input style={{ display: "none" }} type="file" id="file" required />
            <label htmlFor="file">
              <img width={50} src={Add} alt="" />
              <span>Add an avatar</span>
            </label>
            <button type="submit">Sign up</button>
          </form>
          <p>
            You do have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
            >
              Login
            </span>
          </p>
        </Spin>
      </div>
    </div>
  );
};

export default Register;
