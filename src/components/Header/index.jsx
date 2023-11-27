import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MetroSpinner } from 'react-spinners-kit';
import './styles.scss';

const Header = () => {
    let [options, setOptions] = useState(false);
    let [signingOut, setSigningOut] = useState(false);
    let [searchText, setSearchText] = useState('');
    const nav = useNavigate();

    const sign_out = () => {
        setSigningOut(true);
        localStorage.removeItem('jit_user_data')

        setTimeout(() => nav('/sign-in'), 3000);
    };

    useEffect(() => {
      setSearchText(localStorage.getItem('jit_search_text'));
    }, []);


    return (
      <div className="header">
        <div className="left" onClick={() => nav('/dashboard')}>
          <div className="name">JS Issue Tracker</div>
          <div className="group">Group D Project</div>
        </div>

        <div className="right">

          <div className='searchbar'>
            <input
              type="text" 
              placeholder="Search for packages, libraries, issues, etc."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                localStorage.setItem('jit_search_text', e.target.value);
                // Dispatch an event to update the packages list
                const event = new Event('search_text_change');
                document.dispatchEvent(event);
              }}
              />
            </div>

          <div className='search icon' onClick={() => nav('/packages')}>
            <i className="bx bx-search"></i>
          </div>

          <div className="notifications icon">
            <i className="bx bx-bell"></i>
          </div>

          <div
            className={`more icon ${options ? "active" : ""}`}
            onClick={() => setOptions(!options)}
          >
            <i className="bx bx-dots-vertical-rounded"></i>

            <div className="options" onClick={(e) => e.stopPropagation()}>

              <div className="option" onClick={() => nav("/starred-packages")}>
                <div className="option-icon">
                  <i className="bx bx-star"></i>
                </div>
                <span>Packages</span>
              </div>

              <div className="option" onClick={() => nav("/profile")}>
                <div className="option-icon">
                  <i className="bx bx-user"></i>
                </div>
                <span>Profile</span>
              </div>

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