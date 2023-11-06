import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MetroSpinner } from 'react-spinners-kit';
import './styles.scss';

const Header = () => {
    let [options, setOptions] = useState(false);
    let [signingOut, setSigningOut] = useState(false);
    const nav = useNavigate();

    const sign_out = () => {
        setSigningOut(true);
        localStorage.removeItem('jit_user_data')

        setTimeout(() => nav('/sign-in'), 3000);
    };


    return (
      <div className="header">
        <div className="left" onClick={() => nav('/dashboard')}>
          <div className="name">JS Issue Tracker</div>
          <div className="group">Group D Project</div>
        </div>

        <div className="right">
          <div className="notifications icon">
            <i className="bx bx-bell"></i>
          </div>

          <div className="user icon" onClick={() => nav("/profile")}>
            <i className="bx bx-user"></i>
          </div>

          <div
            className={`more icon ${options ? "active" : ""}`}
            onClick={() => setOptions(!options)}
          >
            <i className="bx bx-dots-vertical-rounded"></i>

            <div className="options" onClick={(e) => e.stopPropagation()}>
              <div className="option" onClick={() => nav("/settings")}>
                <div className="option-icon">
                  <i className="bx bx-cog"></i>
                </div>
                <span>Settings</span>
              </div>

              <div className="option" onClick={sign_out}>
                <div className="option-icon">
                  {signingOut ? (
                    <MetroSpinner color="black" size={20} />
                  ) : (
                    <i className="bx bx-exit"></i>
                  )}
                </div>

                <span>{signingOut ? "Signing out": "Sign out"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Header;