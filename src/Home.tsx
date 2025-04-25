import React from 'react';
import logo from './logo.svg';
import './Home.css';
import { NavLink } from 'react-router';

export default function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <NavLink to='/test'>Go to test page</NavLink>
      </header>
    </div>
  );
}