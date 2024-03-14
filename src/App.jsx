import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

function App() {
  log("<App /> rendered");
  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount); // this state update is scheduled by react and it will be executed in pretty much instant but it will not be executed immediately
    //this is a popular misconception that people thinks that they update the state in one line and they can use it from another line
    console.log(newCount); // this wont work
    // setChosenCount((prevCount) => prevCount + newCount);

    //react performs state batching while if there are multiple state updates in the same time
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;

// How virtual DOM works in React
// step 1: Creating a component Tree
// step 2: Creating a virtual snapshot of the Target HTML code
// step 3: Compare New Virtual DOM Snapshot to Previous (Old) Virtual DOM snapshot
// step 4: Re-rendering the component tree
