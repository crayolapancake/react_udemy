import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  // Props are set and passed from outside component
  //  State is js object.
  state = {
    persons: [
      { id: 1, name: "jemma", age: "30"},
      { id: 2, name: "tori", age: "103"},
      { id: 3, name: "lottie", age: "5"},
    ],
    otherState: 'some other value',
    showPersons: false,
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(pers => {     // default method
    return pers.id === id;                                //returns if true
    });

    const person = {
      ...this.state.persons[personIndex]
    };// SPREAD OPERATOR: creates new object. Replaces Object.assign.

    person.name = event.target.value;  // manipulating new object, NOT original: immutability

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} )
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1)          // removes one thing from the array
    this.setState({persons: persons});      // set persons to contain spliced persons const
  }

  // const persons = this.state.persons.slice();
  // ES5 WAY: slice copies array and returns a new one: important so original persons object is not mutatated. Can make apps unpredictable.

  // ES6 WAY: spread operator: creates a new array with the objects from the old array.

  //arrow method negated need to bind this in constructor.

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solod blue',
      padding: '8px',
      curson: 'pointer',
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {/* map state array into element. Executes a method on each element and returns a new array. Takes ( an element of the array, index )*/}
          {this.state.persons.map((person, index) => {
          // here it maps into an array with JSX objects which react will render.
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id} // use ID (not index) where avaiable from api's or external data.
              changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            })}
        </div>
      )
      style.backgroundColor = 'red';      // change style dynamically: red when button is clicked
      style[':hover'] = {                 // radium feature
        backgroundColor: 'salmon',
        color: 'black',
      };
    }

    const classes = [];
    if (this.state.persons.length <= 2){
      classes.push('red');
    }
    if (this.state.persons.length <= 1){
      classes.push('bold');         // will be red & bold. Join in render gives "red, bold"
    }

    return (
      // wrap in radium thing for advanced features ie media queries
      <div className="App">
        <h1>Hello People</h1>
        <p className={classes.join(' ')}>This works</p>
        <button
          style={style}
          onClick={() => this.togglePersonHandler()}>
          Toggle Person
        </button>
        {persons}
      </div>
    );
  }
}

// higher order component: cmponent wrapping your component with extra features.
export default App;
