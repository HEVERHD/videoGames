import React from "react";

export default function NotFound ({image}) {
    return (
        <div>
            {image === "noimage" ?
            <img className = "img" src="https://acortar.link/e4iUP" alt="Link caido"/>
            : <img className="notfound" src="https://acortar.link/xjEvD" alt="Link caido"/>}
        </div>
    );
};