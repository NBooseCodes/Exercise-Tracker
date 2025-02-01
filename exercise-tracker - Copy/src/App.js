import logo from './NicePng_gym-png_2392919.png';
import './App.css';
import React, {useEffect, useState} from 'react';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Exercise Logger and Tracker</h1>
        <p>
          This is an app that allows a user to input and log exercises they have completed. 
          This includes creating an exercise, listing the number of reps completed, listing the weight
          used to complete the exercise, the units of that weight, and the date completed. The user may 
          alter these entries at any time and they can delete an entry whenever they choose.
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <Navigation/>
            <Routes>
              <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
              <Route path="/edit" element={<EditExercisePage exerciseToEdit={exerciseToEdit}/>}></Route>
              <Route path="/create" element={<CreateExercisePage/>}></Route>
            </Routes>
        </Router>
        
      </header>
      <footer>© 2023 Nicole Boose.</footer>
    </div>
  );
}

export default App;
