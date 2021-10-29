import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"


export default function LandingPage() {

  return (
    <div class="background">
      <div class="title" >
        <h2>Welcome to Videogames</h2>
        <Link to="/home">
          <button type="submit">Enter</button>
        </Link>
      </div>
      
    </div>
  );
}


