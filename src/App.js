import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import Packages from './components/Packages';
import PackageInfo from './components/PackageInfo';
import PackageIssue from './components/PackageIssue';
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
					<Route path='/packages' element={ <Packages />} />
					<Route path='/sign-in' element={ <SignIn />} />
					<Route path='/sign-up' element={ <SignUp />} />
					<Route path='/:package-name' element={ <PackageInfo /> }></Route>
					<Route path='/:package-name/issue/:issue-id' element={ <PackageIssue /> }></Route>
				</Routes>
			</Router>
		</div>
		);
	}
	
	export default App;