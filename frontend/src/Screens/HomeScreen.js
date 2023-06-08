import React from "react";
import HeaderNavBar from "../Components/HeaderNavBar";
export default function HomeScreen() {
  const token = localStorage.getItem("name");

  return (
    <>
      <div className="HomeScreen">
        <HeaderNavBar />

        <h1>Welcome {token}</h1>
      </div>
    </>
  );
}
