import './App.css';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import {useState} from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import { Signup } from './components/Signup';

function App() {
  const [ alert, setalert ] = useState(null);
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert alert={alert}></Alert>
          <div className="container my-3">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} />}>
              </Route>
              <Route exact path='/about' element={<About />}>
              </Route>
              <Route exact path='/login' element={<Login showAlert={showAlert} />}>
              </Route>
              <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
