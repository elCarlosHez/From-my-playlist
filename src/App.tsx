import React from 'react';

import { Link } from 'react-router-dom';

import logo from './assets/logo.png';
import './styles/App.css';

const App = () => (
  <div className="flex justify-center items-center flex-col">
    <img className="max-w-full mb-5" alt="From my music" src={logo} />
    <div className="flex justify-between items-center">
      <Link to="/youtube" className="btn btn-primary text-center flex-1 ml-5">
        Link Youtube Music Account
      </Link>

      <Link to="/spotify" className="btn btn-secondary text-center flex-1 ml-5">
        Link Spotify Account
      </Link>
    </div>
  </div>
);

export default App;
