import React from 'react'

const Header = (props) => {
  return (
    <h1> {props.course} </h1>
  );
}

const Part = ({part, exercise}) => {
  return(
    <p>
        {part} {exercise}
    </p>
  );
}

const Content = (props) => {
  return (
    <p>
      <Part part={props.parts[0].name} exercise={props.parts[0].numEx} />
      <Part part={props.parts[1].name} exercise={props.parts[1].numEx} />
      <Part part={props.parts[2].name} exercise={props.parts[2].numEx} />
    </p>
  );
}
const Total = (props) => {
  return (
    <p> number of exercises = {props.parts[0].numEx + props.parts[1].numEx + props.parts[2].numEx}</p>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [ 
      {
      name: 'Fundamentals of React',
      numEx: 10
      },
      {
        name: 'Using props to pass data',
        numEx: 7
      },
      {
        name: 'State of a component',
        numEx: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default App