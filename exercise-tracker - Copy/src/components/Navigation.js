import React from 'react';
import { Link } from 'react-router-dom';

// Controls navigation between different links Home, Add an Exercise, and Edit an Exercise
function Navigation() {
    return (
        <nav className="App-nav">
            <Link to="/">Home</Link>
            <Link to="/create">Add an exercise</Link>
            <Link to="/edit">Edit an Exercise</Link> 
        </nav>
    );
  }
export default Navigation;