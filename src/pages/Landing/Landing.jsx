import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Category from "../../components/Category/Category";
import Layout from "../../components/Layout/Layout";
import ProductList from "../../components/Product/ProductList";

function Landing() {
  return (
    <Layout>
      <Carousel />
      <Category />
      <ProductList />
    </Layout>
  );
}

export default Landing;
