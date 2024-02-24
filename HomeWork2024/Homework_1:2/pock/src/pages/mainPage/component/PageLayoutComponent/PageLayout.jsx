import "./PageLayoutStyle.css";
import React from "react";
import Card from "../CardComponent/Card";

const PageLayout = ({data}) => {
  return (
    <div className="LayoutContainer">
      {data.length
      ? (data.map((pokemon, index) => (
        <Card
          key={index}
          pokemon={pokemon}
          id={(index+1).toString()}
        />
      )))
      : 'Покеманов не будэт'}
    </div>
  )
}

export default PageLayout;