import {useState} from 'react';
import './styles.scss';

const Home = () => {
    let [user, setUser] = useState({name: 'default'});
    return (
        <div className='home'>
            Welcome, {user.name}!
        </div>
    )
};
export default Home;