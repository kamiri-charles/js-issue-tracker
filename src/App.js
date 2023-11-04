import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import SignIn from './components/SignIn';
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
          <Route path='/sign-in' element={ <SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;