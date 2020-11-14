import React from 'react'

function Name(props) {
  const { firstName, lastName } = props.value
  return (
  <li>Name: { firstName } { lastName } </li>
  )
};

export default Name
