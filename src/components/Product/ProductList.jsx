import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loder from "../Loder/Loder"; // use your loader component
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // start as true

  useEffect(() => {
    setIsLoading(true); // show loader immediately
    axios
      .get("https://fakestoreapi.com/products?limit=20")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false)); // hide loader after fetch
  }, []);

  return (
    <>
      {isLoading ? (
        <Loder />
      ) : (
        <section className="products_container">
          {products.map((product) => (
            <ProductCard renderAdd={true} key={product.id} product={product} />
          ))}
        </section>
      )}
    </>
  );
}

export default ProductList;
