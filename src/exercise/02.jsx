import React from "react";
import { Switch } from "../switch";

// Exercise 2: Move the state inside the <Toggle /> component

const Toggle = () => {
  // TODO: Maintain state here
  // const [on, setOn] = React.useState(false)

  return null;
};

const ToggleOn = () => null;

const ToggleOff = () => null;

const ToggleButton = () => {
  // TODO: Pass the correct prop values for `on` and `onClick` into the switch
  return <Switch on={null} onClick={() => console.log('todo')} />;
};

export const Exercise02 = () => {
  // Rather than maintaining the state in the component usage, move it to <Toggle>

  return (
    <div>
      {`Exercise 02`}
      <Toggle>
        <ToggleOn>On</ToggleOn>
        <ToggleOff>Off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  );
};
