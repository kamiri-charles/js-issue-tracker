import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sign_in } from './sign_in';
import './styles.scss';

const SignIn = () => {

    let nav = useNavigate();
    let [userData, setUserData] = useState({username_or_email: '', password: ''});
    let [showPassword, setShowPassword] = useState(false);

    return (
      <div className='sign-in'>

        <div className="title">
          <div className="name">JS Issue Tracker</div>
          <div className="group">Group D Project</div>
        </div>

        <form>
          <div className='form-title'>Sign in to your account.</div>
          <label>
            <span className={userData.username_or_email === '' ? '' : 'active'}>
              Username / Email address
            </span>

            <input
              className={userData.username_or_email === '' ? '' : 'active'}
              type='text'
              value={userData.username_or_email}
              onChange={(e) =>
                setUserData({ ...userData, username_or_email: e.target.value })
              }
              required
            />
          </label>
          <label>
            <span className={userData.password === '' ? '' : 'active'}>
              Password
            </span>

            <input
              className={userData.password === '' ? '' : 'active'}
              type={showPassword ? 'text' : 'password'}
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
            />

            <i
              className={
                showPassword
                  ? 'bx bx-hide show-password'
                  : 'bx bx-show show-password'
              }
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </label>

          <button
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              sign_in(userData, nav);
            }}
          >
            Log In
          </button>
        </form>
      </div>
    );
};

export default SignIn;