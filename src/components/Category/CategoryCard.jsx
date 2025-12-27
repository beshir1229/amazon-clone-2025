import React from "react";
import classes from "./CategoryCard.module.css";
import {Link} from 'react-router-dom'
function CategoryCard({ data }) {
  return (
    <div className={classes.category_card}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h3>{data.title}</h3>
        </span>
        <img src={data.imglink} alt={data.title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
