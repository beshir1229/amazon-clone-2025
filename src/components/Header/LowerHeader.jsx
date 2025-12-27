import React from "react";
import { TiThMenu } from "react-icons/ti";
import classes from "./LowerHeader.module.css";

function LowerHeader() {
  return (
    <div className={classes.lower_container}>
        
      <ul>
        <li className={classes.all}>
          <TiThMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
