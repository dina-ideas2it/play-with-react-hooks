import React, { createRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Child from "./Child";
import Timer from "./Timer";

import "./styles.css";

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

function App() {
  const ref = createRef();
  const input = createRef();
  useEffect(() => {
    console.log("Main Component");
    console.log(ref);
    console.log(input);
  });
  return (
    <div className="App">
      <h1>Parent</h1>
      <Child ref={input} />
      <FancyButton ref={ref}>Click me!</FancyButton>;
      <h2>Start editing to see some magic happen!</h2>
      <br />
      <h4>Timer</h4>
      <Timer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
