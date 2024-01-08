import Cart from "@/components/cart/cart";
import { currencyFormatter } from "@/currencyFormatter/currencyFormatter";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function CartPage() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [userCart, setUserCart] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (session) {
      const sessionEmail = session.user.email;
      async function getData() {
        try {
          const response = await fetch("/api/cart/cart", {
            method: "POST",
            body: JSON.stringify({ sessionEmail }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Couldn't get any response");
          }

          const data = await response.json();
          const { userData } = data;
          const userCartData = userData.cart;

          setUserCart(userCartData);
          setDataLoaded(true);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }

      getData();
    }
  }, [session]);

  if (loading || !dataLoaded) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
      {userCart.length === 0 && <p>No cart yet added</p>}
      {userCart.length > 0 && (
        <>
          <h1>Total</h1>
          <p>
            {currencyFormatter(
              userCart.reduce(
                (totalPrice, product) =>
                  totalPrice + product.price * product.quantity,
                0
              )
            )}
          </p>
          <div>
            {userCart.map((item) => (
              <Cart key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
