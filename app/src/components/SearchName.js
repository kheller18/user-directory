import React, { useContext } from 'react';
import DataContext from '../utils/DataContext';
import '../styles/SearchName.css';

const SearchName = () => {
  const context = useContext(DataContext);
  return (
    <div className='searchbox'>
      <div>
          <span className='search-label'>Search</span>
          <input
            type='search'
            placeholder='Name'
            aria-label='Search by name'
            onChange={event => context.handleSearchChange(event)}
          />
        </div>
    </div>
  );
};

export default SearchName;
