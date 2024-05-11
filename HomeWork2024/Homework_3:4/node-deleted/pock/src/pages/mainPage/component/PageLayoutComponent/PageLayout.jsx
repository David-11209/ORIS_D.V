import "./PageLayoutStyle.css";
import React from "react";
import Card from "../CardComponent/Card";

const PageLayout = ({data}) => {
  return (
    <div className="LayoutContainer">
      {data.length
      ? (data.map((pockemon) => (
        <Card
          key={pockemon.id}
          pockemon={pockemon}
        />
      )))
      : 'Поcкеманов не будэт'}
    </div>
  )
}

export default PageLayout;