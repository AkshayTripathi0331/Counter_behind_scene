import React, { useState, memo, useCallback } from "react";
import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";
import CounterHistory from "./CounterHistory.jsx";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  const initialCountIsPrime = isPrime(initialCount);
  const [counterChanges, setCounterChanges] = useState([{ value: 0, id: Math.random() * 1000 }]);

  const handleDecrement = useCallback(function handleDecrement() {
    setCounterChanges((prevCounterChanges) => [{ value: -1, id: Math.random() * 1000 }, ...prevCounterChanges]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounterChanges((prevCounterChanges) => [{ value: 1, id: Math.random() * 1000 }, ...prevCounterChanges]);
  }, []);

  const currentCounter = counterChanges.reduce((prevCounter, counterChange) => prevCounter + counterChange.value, initialCount);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});
export default Counter;

// import React, { useState, memo, useCallback, useMemo } from "react";
// import IconButton from "../UI/IconButton.jsx";
// import MinusIcon from "../UI/Icons/MinusIcon.jsx";
// import PlusIcon from "../UI/Icons/PlusIcon.jsx";
// import CounterOutput from "./CounterOutput.jsx";
// import { log } from "../../log.js";
// import CounterHistory from "./CounterHistory.jsx";

// // Every component has its own isolated state if its recall multiple times then each state associated to every call of component will have independent effect

// function isPrime(number) {
//   log("Calculating if is prime number", 2, "other");
//   if (number <= 1) {
//     return false;
//   }

//   const limit = Math.sqrt(number);

//   for (let i = 2; i <= limit; i++) {
//     if (number % i === 0) {
//       return false;
//     }
//   }

//   return true;
// }

// const Counter = memo(function Counter({ initialCount }) {
//   log("<Counter /> rendered", 1);

//   //useEffect runs after the component execution
//   // useEffect(()=>{
//   //   setCounterChanges[{ value: initialCount, id: Math.random() * 1000 }]
//   // },[initialCount]);

//   const initialCountIsPrime = useMemo(
//     () => isPrime(initialCount),
//     [initialCount]
//   );

//   const [counterChanges, setCounterChanges] = useState([
//     { value: 0, id: Math.random() * 1000 },
//   ]);

//   const currentCounter = counterChanges.reduce(
//     (prevCounter, counterChange) => prevCounter + counterChange.value,
//     0
//   )

//   // const initialCountIsPrime = useMemo(
//   //   ()=> isPrime(initialCount),
//   //   [initialCount]
//   // );

//   // const [counterChanges, setCounterChanges] = useState([initialCount]);
//   // const currentCounter = counterChanges.reduce(
//   //   (prevCounter, counterChange) => prevCounter +counterChange,
//   //   0
//   // );

//   // const currentChanges = useMemo(
//   //   () =>
//   //     counterChanges.reduce(
//   //       (prevCounter, counterChange) => prevCounter + counterChange.value,
//   //       0
//   //     ),
//   //   [counterChanges]
//   // );

//   const handleDecrement = useCallback(function handleDecrement() {
//     // setCounter((prevCounter) => [...prevCounter, -1]);
//     setCounterChanges((prevCounterChanges) => [
//       { value: -1, id: Math.random() * 1000 },
//       ...prevCounterChanges,
//     ]);
//   }, []);

//   const handleIncrement = useCallback(function handleIncrement() {
//     // setCounter((prevCounter) => [...prevCounter, 1]);
//     setCounterChanges((prevCounterChanges) => [
//       { value: 1, id: Math.random() * 1000 },
//       ...prevCounterChanges,
//     ]);
//   }, []);

//   return (
//     <section className="counter">
//       <p className="counter-info">
//         The initial counter value was <strong>{initialCount}</strong>. It{" "}
//         <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
//       </p>
//       <p>
//         <IconButton icon={MinusIcon} onClick={handleDecrement}>
//           Decrement
//         </IconButton>
//         <CounterOutput value={currentCounter} />
//         <IconButton icon={PlusIcon} onClick={handleIncrement}>
//           Increment
//         </IconButton>
//       </p>
//       <CounterHistory history={counterChanges} />
//     </section>
//   );
// });
// export default Counter;
