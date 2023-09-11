import React from "react";
import { PulseLoader } from "react-spinners";

const PageLevelLoader = () => {
  return (
    <div className="flex justify-center items-center mt-60">
      <PulseLoader color="#000000" size={10} />
    </div>
  );
};

export default PageLevelLoader;
