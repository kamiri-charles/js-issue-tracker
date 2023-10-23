import {useState} from 'react';
import './styles.scss';

const Home = () => {
    let [user, setUser] = useState({name: 'Default'});
    return (
        <div className='home'>
            Welcome, {user.name}!
        </div>
    )
};
export default Home;