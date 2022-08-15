import React, { useState } from "react";
import { Switch } from "./switch";
import { Exercise01, Exercise02 } from "./exercise";

export const Application = () => {
  return (
    <>
      {/* <Exercise01 /> */}
      <Example />
    </>
  );
};

const Example = () => {
  const [on, setOn] = useState(false);
  return (
    <div>
      <Switch on={on} onClick={() => setOn((prev) => !prev)} />
    </div>
  );
};
