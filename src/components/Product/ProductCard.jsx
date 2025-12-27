import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { DataContext} from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, renderAdd }) {
  // ✅ Hook MUST be first
  const [, dispatch] = useContext(DataContext);
  

  // ✅ conditional AFTER hook
  if (!product) return null;

  const { image, title, id, rating, price, description } = product;

  const addTocart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  return (
    <div className="product_card">
      <div className="product_image">
        <Link to={`/products/${id}`}>
          <img src={image} alt={title} />
        </Link>
      </div>

      <div className="product_info">
        <h3 className="product_title">{title}</h3>

        {description && <p className="product_description">{description}</p>}

        <div className="product_rating">
          <Rating
            value={rating?.rate || 0}
            precision={0.1}
            readOnly
            size="small"
            sx={{ color: "#ffa41c" }}
          />
          <small>({rating?.count || 0})</small>
        </div>

        <div className="product_price">
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className="add_to_cart" onClick={addTocart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
