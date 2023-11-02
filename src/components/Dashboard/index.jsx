import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const Dashboard = () => {

    let nav = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        if (!localStorage.getItem('jit_user_data')) {
            // Redirect to sign in page
            nav('/sign-in');
        };
    }, [nav]);

    return (
        <div className='home'>
            Welcome, default!
        </div>
    )
};
export default Dashboard;