import "./PageLayoutStyle.css";
import React from "react";
import Card from "../CardComponent/Card";

const PageLayout = ({data}) => {
  return (
    <div className="LayoutContainer">
      {data.length
      ? (data.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
        />
      )))
      : 'Покеманов не будэт'}
    </div>
  )
}

export default PageLayout;