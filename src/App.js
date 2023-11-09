import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import 'boxicons/css/boxicons.min.css';
import './App.scss';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='' element={ <Navigate to='/dashboard' />}></Route>
					<Route path='/dashboard' element={ <Dashboard />} />
					<Route path='/profile' element={ <UserProfile />} />
					<Route path='/settings' element={ <Settings />} />
					<Route path='/sign-in' element={ <SignIn />} />
					<Route path='/sign-up' element={ <SignUp />} />
				</Routes>
			</Router>
		</div>
		);
	}
	
	export default App;