import MealDetail from "@/components/meal/meal";
import { foodData } from "@/data/data";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function MealDetailPage({ mealDetail }) {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionEmail, setSessionEmail] = useState();
  const [userCartData, setUserCartData] = useState();
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      console.log("session from slug", session);
      if (!session) {
        router.replace("/auth");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session) {
          return session.user;
        }
      })
      .then((data) => setSessionEmail(data.email));
  }, []);

  useEffect(() => {
    async function getCartQuantity() {
      const response = await fetch("/api/cart/cart", {
        method: "POST",
        body: JSON.stringify({ sessionEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const { userData } = data;

      if (userData) {
        setUserCartData(userData.cart);
      }
    }
    getCartQuantity();
  }, [sessionEmail]);

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  return <MealDetail mealDetail={mealDetail} userCartData={userCartData} />;
}

export async function getStaticPaths() {
  const paths = foodData.map((meal) => ({ params: { slug: meal.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const mealDetail = foodData.find((food) => food.slug === params.slug);

  return {
    props: {
      mealDetail,
    },
  };
}
