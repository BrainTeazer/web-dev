import React, { useState } from "react";

const Button = ({ func, text }) => {
  return <button onClick={func}> {text} </button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const rng = (min, max) => Math.floor(Math.random() * (max - min) + min);

  const voting = () => {
    const newVote = [...votes];
    newVote[selected] += 1;
    setVotes(newVote);
  };

  const newAnecdote = () => {
    setSelected(rng(0, anecdotes.length));
  };

  const maxVal = (arr) => {
    if (arr.length == 0) {
      return -1;
    }
    var max = arr[0];
    var index = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
        index = i;
      }
    }
    return index;
  };

  return (
    <div>
      <h1> Anecdote of the day </h1>
      <p>{anecdotes[selected]}</p>
      <p> has {votes[selected]} votes </p>
      <Button func={voting} text="vote" />
      <Button func={newAnecdote} text="next anecdote" />

      <h1> Anecdote with most votes </h1>
      <p> {anecdotes[maxVal(votes)]}</p>
      <p> has {votes[maxVal(votes)]} votes</p>
    </div>
  );
};

export default App;
