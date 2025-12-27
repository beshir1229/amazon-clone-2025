import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
import Loder from "../../components/Loder/Loder";
import classes from "./Results.module.css";

function Results() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // single loading state

  useEffect(() => {
    setIsLoading(true); // ensure spinner shows before request
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false)); // stop spinner after request
  }, [categoryName]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>{categoryName.toUpperCase()}</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loder />
        ) : (
          <div className={classes.products_grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product}
              renderAdd={true} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Results;
