import React from 'react';
import './Person.css';


// simple js function: stateless functional component
// pass props as attribute from app.js person class (name, age).
const person = ( props ) => {
  return (
    <div className="Person">
        <p onClick={props.click}>
          I'm {props.name} and I am {props.age} years old!
        </p>

        <p>{props.children}</p>

        <input
          type="text"
          onChange={props.changed}
          value={props.name}
        />
    </div>
  )
};


export default person;
