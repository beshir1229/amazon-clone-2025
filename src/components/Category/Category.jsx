import React from "react";
import { categoryInfos } from "./Categories";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category() {
  return (
    <section className={classes.category_container}>
      {categoryInfos.map((category) => (
        <CategoryCard key={category.name} data={category} />
      ))}
    </section>
  );
}

export default Category;
