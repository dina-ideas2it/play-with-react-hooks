import React, { useState, useEffect, createRef, forwardRef } from "react";

function NumberBox({ id, idx, number, cursor, setFocus }) {
  const handleClick = () => {
    setFocus(idx);
  };
  return (
    <span
      onClick={handleClick}
      className={cursor === idx ? "numberBox cursor" : "numberBox"}
    >
      {number}
    </span>
  );
}

const InputBox = forwardRef(({ onChange, cursor, time, ...props }, ref) => {
  const handleKeyUp = event => {
    let value = event.target.value;

    const keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    const keyCode = "which" in event ? event.which : event.keyCode;

    if (keyCodes.indexOf(keyCode) > -1) {
      let timeArr = time.split("");
      let slicedTimeArr = timeArr.slice(0, cursor);
      slicedTimeArr.push(event.key);
      slicedTimeArr.shift();
      timeArr = slicedTimeArr.concat(timeArr.slice(slicedTimeArr.length));
      value = [...timeArr];
    } else {
      value.replace(/\D+/g, "");
      value = [...time];
    }
    event.target.value = value.join("");
    onChange(value);
    setCursorPosition();
  };

  const setCursorPosition = () => {
    if (ref.current) {
      ref.current.setSelectionRange(cursor, cursor);
    }
  };

  useEffect(
    () => {
      setCursorPosition();
    },
    [cursor]
  );

  return (
    <input
      ref={ref}
      className="inputBox"
      type="text"
      onKeyUp={event => handleKeyUp(event)}
      {...props}
    />
  );
});

export default function Timer() {
  const input = createRef();
  const [time, setTime] = useState("000000");
  const [cursor, setCursor] = useState(6);

  const handleFocus = idx => {
    setCursor(idx);
    input.current.focus();
  };

  const handleTimeChange = newTime => {
    setTime(newTime.join(""));
  };

  const splitIntoTimeComponents = time => {};
  const timeArr = time.split("");
  return (
    <div>
      <div className="timer">
        {timeArr.map((value, idx) => (
          <>
            <NumberBox
              idx={idx + 1}
              number={value}
              cursor={cursor}
              setFocus={handleFocus}
            />
            {idx === 1 && <span className="time-component">h</span>}
            {idx === 3 && <span className="time-component">m</span>}
            {idx === 5 && <span className="time-component">s</span>}
          </>
        ))}
        <InputBox
          time={time}
          ref={input}
          onChange={handleTimeChange}
          defaultValue={time}
          cursor={cursor}
        />
      </div>
      <div>
        <div className="action">
          <div className="action-container">
            <button className="action-negative">Reset</button>
            <button className="action-positive">Start</button>
          </div>
        </div>
      </div>
    </div>
  );
}
