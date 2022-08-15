import React from "react";

// Exercise 1: Create a compound Toggle component

// TODO: Finish implementation for the following Toggle components
const Toggle = () => null

const ToggleOn = () => null

const ToggleOff = () => null

/**
 * Create a Toggle component with the following api
 * @example
 * <Toggle value={on} onChange={onChange}>
 *   <ToggleOn>On</ToggleOn>
 *   <ToggleOff>Off</ToggleOff>
 * </Toggle>
 */
export const Exercise01 = () => {
	// The <Toggle> component should be a "controlled component" taking a value and onChange
	//  https://reactjs.org/docs/forms.html#controlled-components

	const onChange = () => {
		console.log('todo')
	}

  return (
    <div>
      {`Exercise 01`}
      <Toggle value={true} onChange={onChange}>
        <ToggleOn>On</ToggleOn>
        <ToggleOff>Off</ToggleOff>
      </Toggle>
    </div>
  );
};
