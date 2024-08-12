import React from "react";

const SlotM = ({ x, y, z }) => {
  const isMatch = x === y && y === z;

  return (
    <div className="slot_inner">
      <h1>
        {x} {y} {z}
      </h1>
      <h1>{isMatch ? "This is matching" : "This is not matching"}</h1>
      <hr />
    </div>
  );
};

export default SlotM;
