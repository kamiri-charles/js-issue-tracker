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
            Welcome, {userData?.username}!
        </div>
    )
};
export default Dashboard;