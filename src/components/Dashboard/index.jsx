import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import './styles.scss';

const Dashboard = () => {

    let nav = useNavigate();
    let [userData, setUserData] = useState();

    useEffect(() => {
        // Check if user is logged in
        if (localStorage.getItem('jit_user_data') === null) {
            // Redirect to sign in page
            nav('/sign-in');
        } else {
            setUserData(JSON.parse(localStorage.getItem('jit_user_data')));
        }
    }, [nav]);

    return (
        <div className='dashboard'>
            <Header />
            
            <div className="main">
                <div className="user-meta-wrapper">
                    <div className="user-img">
                        <i className="bx bx-user"></i>
                    </div>

                   <div>Welcome, <span>{userData?.username}</span></div>


                    <div className="user-meta">
                        <h3>{userData?.first_name} {userData?.last_name}</h3>
                        <p>{userData?.email}</p>
                    </div>

                    <div className="stats">
                        <div className="stat">
                            <i className="bx bx-star"></i>
                            <div className="stat-title">Starred Packages</div>
                            <div className="stat-value">0</div>
                        </div>

                        <div className="stat">
                            <i className="bx bx-test-tube"></i>
                            <div className="stat-title">Total Tests</div>
                            <div className="stat-value">0</div>
                        </div>

                        <div className="stat">
                            <i className="bx bx-check-circle"></i>
                            <div className="stat-title">Issues Closed</div>
                            <div className="stat-value">0</div>
                        </div>
                    </div>

                </div>
                <div className="packages-wrapper"></div>
                <div className="test-wrapper"></div>
            </div>
        </div>
    )
};
export default Dashboard;