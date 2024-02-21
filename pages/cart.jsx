import Cart from "@/components/cart/cart";
import { currencyFormatter } from "@/currencyFormatter/currencyFormatter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function CartPage() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [userCart, setUserCart] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const sessionEmail = session.user.email;
      console.log(sessionEmail);
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

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/");
    }
  }, [session, router, status]);

  if (session && (loading || !dataLoaded)) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
      {session && userCart.length === 0 && (
        <p className="loading" style={{ padding: "2rem" }}>
          No cart yet added
        </p>
      )}
      {session && userCart.length > 0 && (
        <div className="cartPage">
          <h2>Total</h2>
          <p className="cartTotal">
            {currencyFormatter(
              userCart.reduce(
                (totalPrice, product) =>
                  totalPrice + product.price * product.quantity,
                0
              )
            )}
          </p>
          <div className="cartPadding">
            {userCart.map((item) => (
              <Cart key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
