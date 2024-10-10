import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/timer">Timer</Link></li>
        {/* Add more links for other widgets here */}
      </ul>
    </nav>
  );
};

export default Navigation;