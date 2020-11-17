import React, { useContext } from 'react';
import DataBody from './DataBody';
import DataContext from '../utils/DataContext';
import '../styles/DataTable.css'

// defines the table
const DataTable = () => {
  const context = useContext(DataContext);
  return (
    <div className='data-table'>
      <table>
        <thead>
          <tr>
            {context.developerState.headings.map(({ name, width }) => {
              return (
                <th
                  className = 'col'
                  key = {name}
                  style = {{ width }}
                  onClick = {() => {
                    context.handleSort(name);
                  }}
                >
                  {name}
                </th>
              );
            })}
          </tr>
        </thead>
        <DataBody />
      </table>
    </div>
  );
};

export default DataTable;
