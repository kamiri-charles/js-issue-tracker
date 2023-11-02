import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import 'boxicons/css/boxicons.min.css';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <Router basename='js-issue-tracker'>
        <Routes>
          <Route path='/dashboard' element={ <Dashboard />} />
          <Route path='/sign-in' element={ <SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;