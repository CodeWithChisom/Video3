import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// reducer stuff
type IncrementAction = {
  type: "INCREMENT";
};

type DecrementAction = {
  type: "DECREMENT";
};

type IncrementByValueAction = {
  type: "INCREMENT_BY_VALUE";
  payload: number;
};

type Action = IncrementAction | DecrementAction | IncrementByValueAction;

const counterReducer = (state: number, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "INCREMENT_BY_VALUE":
      return state + action.payload;
    default:
      return state;
  }
};

// context stuff
// useContext example - primarily used to avoid prop drilling
const Context = createContext<null | {
  state: number;
  handleIncrement: () => void;
}>(null);

function App() {
  // useState example - simple count
  const [count, setCount] = useState(0);
  const handleCount = () => {
    setCount((count) => count + 1);
  };

  // useEffect example - only runs on mount
  useEffect(() => {
    console.log("Component has entered");
  }, []);

  // useEffect example - runs on mount and when count is updated
  useEffect(() => {
    console.log("Count was rendered");
  }, [count]);

  // useEffect example - runs every time from mounting to re-rendering
  useEffect(() => {
    console.log("I am unstoppable");
  });

  // useRef example - persisting state values between renders
  const [countWithRef, setCountWithRef] = useState(0);
  const countRef = useRef<number | null>(null);
  const handleCountWithRef = () => {
    countRef.current = countWithRef;
    setCountWithRef((countWithRef) => countWithRef + 1);
  };
  useEffect(() => {
    console.log(countWithRef, countRef.current);
  }, [countWithRef]);

  // useRef example - hooking into dom nodes
  const [countWithH1Ref, setCountWithH1Ref] = useState(0);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const handleCountWithH1Ref = () => {
    setCountWithH1Ref((countWithH1Ref) => countWithH1Ref + 1);
  };
  useEffect(() => {
    console.log(countWithH1Ref, h1Ref.current?.textContent);
  }, [countWithH1Ref]);

  // useReducer example - the reducer function is defined outside to avoid its recreation when the component is re-rendered
  // you can still define it within the component and it will still work
  const initialState = 0;
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const handleIncrement = () => {
    dispatch({ type: "INCREMENT" });
  };
  const handleDecrement = () => {
    dispatch({ type: "DECREMENT" });
  };
  const handleIncrementByValue = (value: number) => {
    dispatch({ type: "INCREMENT_BY_VALUE", payload: value });
  };

  //read up on useMemo and useCallback in the official react docs - react.dev !important

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 ref={h1Ref}>Vite + React</h1>
      <div className="card">
        <button onClick={handleCount}>count is {count}</button>
        <button onClick={handleCountWithRef}>
          count with ref is {countWithRef}
        </button>
        <button onClick={handleCountWithH1Ref}>
          count with h1 ref is {countWithH1Ref}
        </button>
        <p>Reducer count is {state}</p>
        <button onClick={handleIncrement}>Increment Reducer Count</button>
        <button onClick={handleDecrement}>Decrement Reducer Count</button>
        <button onClick={() => handleIncrementByValue(10)}>
          Increment Reducer Count By 10
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* context area */}
      <Context.Provider
        value={{
          state,
          handleIncrement,
        }}
      >
        <Component1 />
      </Context.Provider>
    </>
  );
}

function Component1() {
  return (
    <div>
      <h2>Component 1</h2>
      <Component2 />
    </div>
  );
}

function Component2() {
  return (
    <div>
      <h2>Component 2</h2>
      <Component3 />
    </div>
  );
}

function Component3() {
  return (
    <div>
      <h2>Component 3</h2>
      <Component4 />
    </div>
  );
}

function Component4() {
  return (
    <div>
      <h2>Component 4</h2>
      <Component5 />
    </div>
  );
}

function Component5() {
  <h2>Component 5</h2>;
  return (
    <div>
      <Component6 />
    </div>
  );
}

function Component6() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Can't access context");
  }
  const { state: contextCount, handleIncrement: increment } = context;
  return (
    <div>
      <h2>Component 6</h2>
      <button onClick={increment}>Context Count is {contextCount}</button>
    </div>
  );
}

export default App;
