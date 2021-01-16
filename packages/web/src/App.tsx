import React, { useState } from "react";

export default () => {
  const [counter, setCounter] = useState(1);
  return (
    <div>
      <h1>nav</h1>
      <div>
        <button onClick={(e) => setCounter((counter) => counter + 1)}>
          {counter}
        </button>
      </div>
    </div>
  );
};
