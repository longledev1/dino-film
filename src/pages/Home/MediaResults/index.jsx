import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const MediaResults = () => {
  const location = useLocation();
  const receivedState = location.state || {};
  if (!receivedState) {
    console.log("No state received");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen pt-[108px] text-white">
      <div className="container">
        <p>My name is Long</p>
      </div>
    </div>
  );
};

export default MediaResults;
