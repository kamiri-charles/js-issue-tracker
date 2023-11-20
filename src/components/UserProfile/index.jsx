import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { MetroSpinner } from 'react-spinners-kit';
import './styles.scss';

const UserProfile = () => {

    const [userData, setUserData] = useState({});
    const [userDataCopy, setUserDataCopy] = useState({});
    const [updateError, setUpdateError] = useState('');
    const [loading, setLoading] = useState(false);

    let nav = useNavigate();

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('jit_user_data')));
        setUserDataCopy(JSON.parse(localStorage.getItem('jit_user_data')));

    }, []);

    const isDataEdited = () => {
        return userData.username !== userDataCopy.username ||
            userData.first_name !== userDataCopy.first_name ||
            userData.last_name !== userDataCopy.last_name ||
            userData.password !== userDataCopy.password;
    };

    const update_user_data = () => {
        setLoading(true);
        fetch(`https://jit-api-a6d0d55add94.herokuapp.com/api/users/update/${userData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(res => {
                if (res.ok) return res.json();
                else throw new Error('There was an error updating your account. Please try again.');
            })
            .then(data => {
                localStorage.setItem('jit_user_data', JSON.stringify(data));
                setUserDataCopy(data);
                setLoading(false);
                alert('Your account has been updated successfully!')
                nav('/dashboard');
            })

            .catch((error) => {
                setUpdateError(error.message);
                setLoading(false);
                console.error('Error:', error);
            });
    }


    return (
      <div className="user-profile">
        <Header />
        <div className="profile-wrapper">
          <div className="section">
            <div className="section-title">Account Information</div>

            <div className="field">
              <div className="field-label">User ID</div>
              <input
                type="text"
                className="field-input uneditable"
                value={userData.id}
              />
            </div>

            <div className="field">
              <div className="field-label">Username</div>
              <input
                type="text"
                className={`field-input ${
                  userData.username !== userDataCopy.username ? "edited" : ""
                }`}
                value={userData.username}
                onChange={(e) => {
                  setUserData({ ...userData, username: e.target.value });
                }}
              />
            </div>

            <div className="field name">
              <div className="field-label">Name</div>
              <input
                type="text"
                className={`field-input ${
                  userData.first_name + " " + userData.last_name !==
                  userDataCopy.first_name + " " + userDataCopy.last_name
                    ? "edited"
                    : ""
                }`}
                value={userData.first_name + " " + userData.last_name}
                onChange={(e) => {
                  const name = e.target.value.split(" ");
                  setUserData({
                    ...userData,
                    first_name: name[0],
                    last_name: name[1],
                  });
                }}
              />
            </div>

            <div className="field">
              <div className="field-label">Password</div>
              <input
                type="text"
                className={`field-input ${
                  userData.password !== userDataCopy.password ? "edited" : ""
                }`}
                value={userData.password}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="update-error">{updateError}</div>

          {loading ? (
            <div className="update-loader">
              <MetroSpinner size={30} color="#686769" />
            </div>
          ) : (
            <button
              className={`update ${isDataEdited() ? "" : "inactive"}`}
              onClick={(e) => {
                e.preventDefault();
                if (isDataEdited()) {
                  update_user_data();
                }
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
    );
};

export default UserProfile;