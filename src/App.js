import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  const [alert, setAlert] = useState({
    message: "message",
    type: "success",
    show:false
  })
  const showAlert=(message,type)=>{
    setAlert({
      message: message,
      type:type,
      show:true
    })
    setTimeout(()=>{
      setAlert({
        show:false
      })
    },1500)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message = {alert.message} type = {alert.type} alert={alert.show} />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showAlert={showAlert} />} />
              <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
