import React from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const df = () => {
    navigate("/zones");
  };
  return (
    <div>
      Home
      <button onClick={df}>f</button>
    </div>
  );
}
