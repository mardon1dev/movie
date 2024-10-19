import React from "react";

import "./loading.css"
const Loading = () => {
  return (
    <div className="loader">
      <span className="loading-circle sp1">
        <span className="loading-circle sp2">
          <span className="loading-circle sp3"></span>
        </span>
      </span>
    </div>
  );
};

export default Loading;
