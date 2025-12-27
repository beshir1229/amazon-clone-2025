import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { CircleLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e?.error?.message) {
      setCardError(e.error.message);
    } else {
      setCardError("");
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // 1. Request clientSecret from backend
      const response = await axiosInstance.post(`/payment/create`, {
        total: Math.round(total * 100), // Stripe expects amount in cents
      });

      const clientSecret = response.data.clientSecret;

      if (!clientSecret) {
        setCardError("Unable to get client secret from server.");
        setProcessing(false);
        return;
      }

      // 2. Confirm payment on client
      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email: user?.email },
        },
      });

      if (confirmation.error) {
        setCardError(confirmation.error.message);
        setProcessing(false);
        return;
      }

      const paymentIntent = confirmation.paymentIntent;

      // 3. Save order to Firestore and clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // empty backet
      dispatch({ type: Type.EMPTY_BUSKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      setCardError("Payment failed. Try again!");
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      {/* payment section */}
      <section className={classes.payment}>
        {/* delivery address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>567 St SW</div>
            <div>Zip code 76543</div>
            <div>Atlanta, GA</div>
          </div>
        </div>
        <hr />

        {/* review items */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span>
                      Total Order | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <span className={classes.loading}>
                        <CircleLoader color="#00aaff" size={19} /> wait a
                        while...
                      </span>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
