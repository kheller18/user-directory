import React from 'react';
import SearchName from './SearchName.js';
import '../styles/Nav.css';

// function to display search box to filter users by name
function Nav() {
  return (
    <div>
      <div className="search-area">
        <SearchName />
      </div>
    </div>
  );
};

export default Nav;
