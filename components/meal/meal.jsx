import React, { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./meal.module.css";
import { currencyFormatter } from "@/currencyFormatter/currencyFormatter";
import { useSession } from "next-auth/react";

export default function MealDetail({ mealDetail, userMealQuantity }) {
  const { id, mealName, src, price, description } = mealDetail;
  const [cart, setCart] = useState();
  const [quantity, setQuantity] = useState(userMealQuantity);
  const { data: session } = useSession();

  useEffect(() => {
    if (userMealQuantity !== undefined) {
      setQuantity(userMealQuantity);
    }
  }, [userMealQuantity]);

  async function removeItem() {
    if (session) {
      const userItem = {
        id: id,
        mealName: mealName,
        src: src,
        price: price,
        description: description,
        userEmail: session.user.email,
      };
      const userData = await fetch("/api/meal/removeItem", {
        method: "POST",
        body: JSON.stringify({ userItem }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (userData.ok) {
        const data = await userData.json();
        console.log("data from removed item", data);
        if (data && data.quantity !== undefined) {
          setQuantity(data.quantity);
        }
      }
    } else {
      console.error("User is not authenticated");
      return;
    }
  }

  async function addToCart() {
    if (session) {
      const userItem = {
        id: id,
        mealName: mealName,
        src: src,
        price: price,
        description: description,
        userEmail: session.user.email,
      };
      const userData = await fetch("/api/meal/meal", {
        method: "POST",
        body: JSON.stringify({ userItem }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (userData.ok) {
        const data = await userData.json();
        console.log("data", data);
        if (data && data.quantity !== undefined) {
          setQuantity(data.quantity);
        }
      }
    } else {
      console.error("User is not authenticated");
      return;
    }
  }

  return (
    <div className={classes.mealPage}>
      <div className={classes.mealLeftSide}>
        <Image src={src} alt={mealName} priority width={400} height={400} />
      </div>
      <div className={classes.mealRightSide}>
        <h1>{mealName}</h1>
        <p className={classes.mealDescription}>{description}</p>
        <p className={classes.mealPrice}>
          <span>Price : </span>
          {currencyFormatter(price)}
        </p>

        <div className={classes.mealCart}>
          {quantity > 0 ? (
            <div className={classes.mealCartButtons}>
              <button onClick={removeItem}>-</button>
              <span>{quantity}</span>
              <button onClick={addToCart}>+</button>
            </div>
          ) : (
            <button onClick={addToCart}>Add to cart</button>
          )}
        </div>
      </div>
    </div>
  );
}
