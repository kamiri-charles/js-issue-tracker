import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import 'boxicons/css/boxicons.min.css';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={ <Home />} />
          <Route path='/sign-in' element={ <SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;