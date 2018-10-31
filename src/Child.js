import React, { useEffect, forwardRef } from "react";
import ReactDOM from "react-dom";
import GrandChild from "./GrandChild";

const child = forwardRef((props, ref) => {
  useEffect(() => {
    console.log("use effect");
  });
  return (
    <div>
      Child
      <GrandChild ref={ref} type="input" />
    </div>
  );
});
export default child;
