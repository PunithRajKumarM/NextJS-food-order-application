import MealDetail from "@/components/meal/meal";
import { foodData } from "@/data/data";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function MealDetailPage({ mealDetail }) {
  const [isLoading, setIsLoading] = useState(true);
  // const [sessionEmail, setSessionEmail] = useState();
  const [userMealQuantity, setUserMealQuantity] = useState();
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/");
    } else {
      // setSessionEmail(session.user.email);
      setIsLoading(false);
    }
  }, [session, router, status]);

  // useEffect(() => {
  //   async function getCartQuantity() {
  //     if (!sessionEmail) return;

  //     const response = await fetch("/api/meal/meal", {
  //       method: "POST",
  //       body: JSON.stringify({ sessionEmail }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     const { cart } = data;

  //     if (cart) {
  //       const meal = cart.find((meal) => meal.id === mealDetail.id);

  //       if (meal) {
  //         const quantity = meal.quantity;
  //         if (quantity) {
  //           setUserMealQuantity(quantity);
  //         }
  //       }
  //     }
  //   }
  //   getCartQuantity();
  // }, [sessionEmail, mealDetail.id]);

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <MealDetail mealDetail={mealDetail} userMealQuantity={userMealQuantity} />
  );
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
    revalidate: 1,
  };
}
