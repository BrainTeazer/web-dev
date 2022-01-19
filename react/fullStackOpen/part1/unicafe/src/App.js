import React, { useState } from "react";

// button component
const Button = ({ func, text }) => {
  return <button onClick={func}> {text} </button>;
};

// component for each line in statistics section
const StatisticLine = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td> {props.text} </td>
          <td> {props.value} </td>
          <td> {props.symbol} </td>
        </tr>
      </tbody>
    </table>
  );
};

// component containing of all lines in statistic section
const Statistics = (props) => {
  if (props.stats[3] === 0) {
    return <p> No feedback given </p>;
  } else {
    return (
      <div>
        <StatisticLine text="good" value={props.stats[0]} />
        <StatisticLine text="neutral" value={props.stats[1]} />
        <StatisticLine text="bad" value={props.stats[2]} />
        <StatisticLine text="all" value={props.stats[3]} />
        <StatisticLine text="average" value={props.stats[4] / props.stats[3]} />
        <StatisticLine
          text="positive"
          value={100 * (props.stats[0] / props.stats[3])}
          symbol="%"
        />
      </div>
    );
  }
};

const App = () => {
  // set all states
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [presses, setPresses] = useState(0);
  const [sum, setSum] = useState(0);

  const allStats = [good, neutral, bad, presses, sum];

  // functions for button presses
  const increaseGood = () => {
    setPresses(presses + 1);
    setGood(good + 1);
    setSum(sum + 1);
  };

  const increaseNeutral = () => {
    setPresses(presses + 1);
    setNeutral(neutral + 1);
  };

  const increaseBad = () => {
    setPresses(presses + 1);
    setBad(bad + 1);
    setSum(sum - 1);
  };

  return (
    <div>
      <h1> give feedback </h1>
      <Button func={increaseGood} text="good"></Button>
      <Button func={increaseNeutral} text="neutral"></Button>
      <Button func={increaseBad} text="bad"></Button>

      <h1> statistics </h1>
      <Statistics stats={allStats} />
    </div>
  );
};

export default App;
