import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import classes from "./meal.module.css";
import { currencyFormatter } from "@/currencyFormatter/currencyFormatter";
import { addCartDetail, removeCartDetail } from "@/store/cartSlice";
import { foodData } from "@/data/data";
import { useSession } from "next-auth/react";

export default function MealDetail({ mealDetail }) {
  const { id, mealName, src, price, description } = mealDetail;
  const { data } = useSession();

  const [mealQuantity, setMealQuantity] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart); 

  useEffect(() => {
    const currentMeal = cart.find((m) => m.id === id);
    setMealQuantity(currentMeal ? currentMeal.quantity : 0);
  }, [cart, id]);

  const addMeal = async (id) => {
    const meal = foodData.find((m) => id === m.id);
    dispatch(addCartDetail(meal));
    let { cart } = JSON.parse(localStorage.getItem("food-app-user"));
    const { email } = data.user;
    await fetch("/api/meal/updateMeal", {
      method: "PUT",
      body: JSON.stringify({ email, cart }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const removeItem = async (id) => {
    dispatch(removeCartDetail(id));
    let { cart } = JSON.parse(localStorage.getItem("food-app-user"));
    const { email } = data.user;
    await fetch("/api/meal/updateMeal", {
      method: "PUT",
      body: JSON.stringify({ email, cart }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

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
          {mealQuantity > 0 ? (
            <div className={classes.mealCartButtons}>
              <button onClick={() => removeItem(id)}>-</button>
              <span>{mealQuantity}</span>
              <button onClick={() => addMeal(id)}>+</button>
            </div>
          ) : (
            <button onClick={() => addMeal(id)}>Add to cart</button>
          )}
        </div>
        <button
          style={{
            padding: "0.25rem 1rem",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
}

// useEffect(() => {
//   if (userMealQuantity !== undefined) {
//     setQuantity(userMealQuantity);
//   }
// }, [userMealQuantity]);

// async function removeItem() {
//   if (session) {
//     const userItem = {
//       id: id,
//       mealName: mealName,
//       src: src,
//       price: price,
//       description: description,
//       userEmail: session.user.email,
//     };
//     const userData = await fetch("/api/meal/removeItem", {
//       method: "POST",
//       body: JSON.stringify({ userItem }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (userData.ok) {
//       const data = await userData.json();
//       // console.log("data from removed item", data);
//       if (data && data.quantity !== undefined) {
//         setQuantity(data.quantity);
//       }
//       // router.reload();
//     }
//   } else {
//     console.error("User is not authenticated");
//     return;
//   }
// }

// async function addToCart() {
//   if (session) {
//     const userItem = {
//       id: id,
//       mealName: mealName,
//       src: src,
//       price: price,
//       description: description,
//       userEmail: session.user.email,
//     };
//     const userData = await fetch("/api/meal/meal", {
//       method: "POST",
//       body: JSON.stringify({ userItem }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (userData.ok) {
//       const data = await userData.json();
//       // console.log("data", data);
//       if (data && data.quantity !== undefined) {
//         setQuantity(data.quantity);
//       }
//       // router.reload();
//     }
//   } else {
//     console.error("User is not authenticated");
//     return;
//   }
// }
