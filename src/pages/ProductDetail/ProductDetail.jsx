import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import Layout from "../../components/Layout/Layout";
import Loder from "../../components/Loder/Loder";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import classes from "./ProductDetail.module.css";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading)
    return (
      <Layout>
        <Loder />
      </Layout>
    );

  if (!product)
    return (
      <Layout>
        <p>Product not found.</p>
      </Layout>
    );

  return (
    <Layout>
      <div className={classes.product_page}>
        <div className={classes.product_wrapper}>
          <div className={classes.image_container}>
            <img src={product.image} alt={product.title} />
          </div>

          <div className={classes.product_info}>
            <h1>{product.title}</h1>

            <p className={classes.description}>{product.description}</p>

            <div className={classes.rating}>
              <Rating
                value={product.rating?.rate ?? 0}
                precision={0.1}
                readOnly
                size="small"
                sx={{ color: "#ffa41c" }}
              />
              <small>({product.rating?.count ?? 0})</small>
            </div>

            <p className={classes.price}>
              <CurrencyFormat amount={product.price} />
            </p>

            <button className={classes.cart_btn}>Add to Cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;
