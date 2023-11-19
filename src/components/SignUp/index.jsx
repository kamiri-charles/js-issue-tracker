import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MetroSpinner } from 'react-spinners-kit';
import './styles.scss';

const SignUp = () => {

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();

    const sign_up = () => {
      /* If the fields are empty, display an error */
      if (userData.username_or_email === "") {
        setError("Please enter your username");
      } else if (userData.password === "") {
        setError("Please enter your password.");
      } else {
        setLoading(true);
        fetch("https://jit-api-a6d0d55add94.herokuapp.com/api/users/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => {
            if (res.ok) return res.json();
            else
              throw new Error(
                "Invalid data. Please check your details and try again."
              );
          })
          .then((data) => {
            localStorage.setItem("jit_user_data", JSON.stringify(data));
            setLoading(false);
            nav("/dashboard");
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      }
    };

    return (
      <div className="sign-up">
        <div className="title">
          <div className="name">JS Issue Tracker</div>
          <div className="group">Group D Project</div>
        </div>

        <form>
          <div className="form-title">Sign in to your account.</div>
          <label>
            <span className={userData.first_name === "" ? "" : "active"}>
              Provide your first name
            </span>

            <input
              className={userData.first_name === "" ? "" : "active"}
              type="text"
              value={userData.first_name}
              onChange={(e) => {
                setUserData({ ...userData, first_name: e.target.value });
                setError("");
              }}
              required
            />
          </label>

          <label>
            <span className={userData.last_name === "" ? "" : "active"}>
              Provide your last name
            </span>

            <input
              className={userData.last_name === "" ? "" : "active"}
              type="text"
              value={userData.last_name}
              onChange={(e) => {
                setUserData({ ...userData, last_name: e.target.value });
                setError("");
              }}
              required
            />
          </label>

          <label>
            <span className={userData.email === "" ? "" : "active"}>
              Enter your email
            </span>

            <input
              className={userData.email === "" ? "" : "active"}
              type="text"
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
                setError("");
              }}
              required
            />
          </label>

          <label>
            <span className={userData.username === "" ? "" : "active"}>
              Select a unique username
            </span>

            <input
              className={userData.username === "" ? "" : "active"}
              type="text"
              value={userData.username}
              onChange={(e) => {
                setUserData({ ...userData, username: e.target.value });
                setError("");
              }}
              required
            />
          </label>

          <label>
            <span className={userData.password === "" ? "" : "active"}>
              Password
            </span>

            <input
              className={userData.password === "" ? "" : "active"}
              type={showPassword ? "text" : "password"}
              value={userData.password}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
                setError("");
              }}
              required
            />

            <i
              className={
                showPassword
                  ? "bx bx-hide show-password"
                  : "bx bx-show show-password"
              }
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </label>

          <div className="error">{error}</div>

          {loading ? (
            <MetroSpinner color="#3066be" size={30} />
          ) : (
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                sign_up();
              }}
            >
              Create account
            </button>
          )}
        </form>
      </div>
    );
};

export default SignUp;