import React, { useContext } from 'react';
import DataAreaContext from '../utils/DataContext';
import '../styles/DataBody.css'

// function to render information about users
const DataBody = () => {
  const context = useContext(DataAreaContext)

  function formatDate(date) {
    const dateArr = date.split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const dayArr = dateArr[2].split('T');
    const day = dayArr[0];
    const formattedDate = [month, day, year].join('-');
    return formattedDate;
  };

  return (
    <tbody>
      {context.developerState.filteredUsers[0] !== undefined && context.developerState.filteredUsers[0].name !== undefined ? (
        context.developerState.filteredUsers.map(({ login, name, picture, phone, email, dob }) => {
          return (
            <tr key={login.uuid}>
              <td data-th='Image'>
                <img
                  src={picture.medium}
                  alt=''
                />
              </td>
              <td data-th="Name" className='name-column'>
                {name.first} {name.last}
              </td>
              <td data-th="Phone">
                {phone}
              </td>
              <td data-th="Email">
                <a href={`mailto:${ email }`} target="__blank">
                  {email}
                </a>
              </td>
              <td data-th="DOB">
                {formatDate(dob.date)}
              </td>
            </tr>
          );
        })
      ) : (
        <></>
      )}
    </tbody>
  );
};

export default DataBody;
