import { useState } from "react";
import auth from "../../auth/authentication";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, getLoginStatusFromState, login } from "./userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { addNewUser } from "../../services/apiUser";

function UserSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const status = useSelector(getLoginStatusFromState);
  const isLoggedIn = status === "loggedIn";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();
    loginEmailPassword();
  }

  function handleSignUp(e) {
    e.preventDefault();
    signUpEmailPassword();
  }

  async function loginEmailPassword() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      dispatch(login(userCredential.user.uid));
      dispatch(fetchUserInfo(userCredential.user.uid));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Wrong auth");
    }
  }

  async function signUpEmailPassword() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      dispatch(login(userCredential.user.uid));
      navigate("/");
      console.log(userCredential.user.uid);
      addNewUser(userCredential.user.uid);
    } catch (err) {
      console.log(err);
      setError("Wrong auth");
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <form onSubmit={handleLogin} className="flex justify-center">
          <div className="grid max-w-72 grid-cols-1 gap-1 self-center">
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} />
            <p className="font-semibold text-red-600">{error}</p>
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} />
            <p className="font-semibold text-red-600">{error}</p>
            <button
              onClick={(e) => handleLogin(e)}
              className="border border-black"
            >
              Login
            </button>
            <button
              onClick={(e) => handleSignUp(e)}
              className="border border-black"
            >
              Create Account
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default UserSignIn;
