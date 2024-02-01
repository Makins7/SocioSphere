import React from 'react';

/*
  Props:
    - Data passed from one component to another
    - Read-only data
    - Props is an object -- perform object operations (i.e. Destructuring)

  State:
    - Writeable data *
    - Uses a function to update state (hook)
    - Uses a reconciliation process to determine WHAT JSX to update -- Virtual DOM
    - Local and private data to a component
    - Captures history of the state. By default, we only see previous state.
        Example:
          Navbar closed => State 1 = closed
          Navbar open => State 2 = open
          Navbar closed => State 3 = closed

*/

function Title(data) {
  return (
    <h2>{data.message}</h2>
  )
}

export default Title;