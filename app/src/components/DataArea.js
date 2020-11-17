import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import API from '../utils/API';
import DataContext from '../utils/DataContext';
import DataTable from './DataTable';
import '../styles/DataArea.css'

// function to be able to filter by name
const DataArea = () => {
  const [developerState, setDeveloperState] = useState({
    users: [],
    order: "descend",
    filteredUsers: [],
    headings: [
      { name: "Image", width: "10%", order: "descend" },
      { name: "Name", width: "10%", order: "descend" },
      { name: "Phone", width: "20%", order: "descend" },
      { name: "Email", width: "20%", order: "descend" },
      { name: "Birth Date", width: "10%", order: "descend" }
    ]
  });

  const handleSort = heading => {
    let currentOrder = developerState.headings
      .filter(element => element.name === heading)
      .map(element => element.order)
      .toString();

    if (currentOrder === "descend") {
      currentOrder = "ascend";
    } else {
      currentOrder = "descend";
    }

    const compareFunc = (a, b) => {
      if (currentOrder === "ascend") {
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else if (heading === "dob") {
          return a[heading].age - b[heading].age;
        } else {
          return a[heading].localeCompare(b[heading]);
        }
      } else {
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } else if (heading === "dob") {
          return b[heading].age - a[heading].age;
        }  else {
          return b[heading].localeCompare(a[heading]);
        }
      }
    };
    
    const sortedUsers = developerState.filteredUsers.sort(compareFunc);
    const updatedHeadings = developerState.headings.map(element => {
      element.order = element.name === heading ? currentOrder : element.order;
      return element;
    });

    setDeveloperState({
      ...developerState,
      filteredUsers: sortedUsers,
      headings: updatedHeadings
    });
  };

  const handleSearchChange = event => {
    const filter = event.target.value;
    const filteredList = developerState.users.filter(item => {
      let values = item.name.first.toLowerCase() + " " + item.name.last.toLowerCase();
      console.log(filter, values)
      if (values.indexOf(filter.toLowerCase()) !== -1) {
        return item;
      };
    }, []);
    setDeveloperState({ ...developerState, filteredUsers: filteredList });
  };

  useEffect(() => {
    API.getUsers().then(results => {
      setDeveloperState({
        ...developerState,
        users: results.data.results,
        filteredUsers: results.data.results
      });
    });
  }, []);

  return (
    <DataContext.Provider value={{ developerState, handleSearchChange, handleSort }}>
      <Nav />
      <div className="data-area">
        {developerState.filteredUsers.length > 0 ? <DataTable /> : <div></div>}
      </div>
    </DataContext.Provider>
  );
};

export default DataArea;
