import React from "react";
import ReactDOM from "react-dom";
import Card from "./Cards";
import "./index.css";
import data from "./Data.jsx";

function nf(val) {
  return (
    <Card
    key={val.id}
      imgsrc={val.imgsrc}
      title={val.title}
      sname={val.sname}
      link={val.imgsrc}
    />
  );
}

ReactDOM.render(
  <>
    <h1 className="heading_style">List of my Best Netflix Series Till Now!</h1>
    {data.map(nf)};
    <footer></footer>
  </>,
  document.getElementById("root")
);
