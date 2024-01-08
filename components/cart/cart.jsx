import React from "react";
import Image from "next/image";
import { currencyFormatter } from "@/currencyFormatter/currencyFormatter";
import classes from "./cart.module.css";

export default function Cart({ item }) {
  return (
    <div className={classes.cartList}>
      <h2>{item.mealName}</h2>
      <Image src={item.src} alt="meal" width={300} height={280} priority />
      <h4>{item.description}</h4>
      <p>{currencyFormatter(item.price)}</p>
      <p>Quantity : {item.quantity}</p>
    </div>
  );
}
