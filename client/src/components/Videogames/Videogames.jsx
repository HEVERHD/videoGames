import React from "react";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import "./Videogames.css"

export default function Videogames ({videogames}) {
  return (
    <div className="showing">
      {videogames.length > 0 ?
      videogames.map((data) => (<Card data={data} />))
      : <Loading />
      }
    </div>
  );
};

