import MealDetail from "@/components/meal/meal";
import { foodData } from "@/data/data";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function MealDetailPage({ mealDetail }) {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionEmail, setSessionEmail] = useState();
  const [userMealQuantity, setUserMealQuantity] = useState();
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      // console.log("session from slug", session);
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
      const response = await fetch("/api/meal/meal", {
        method: "POST",
        body: JSON.stringify({ sessionEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const { cart } = data;

      if (cart) {
        const meal = cart.find((meal) => meal.id === mealDetail.id);

        if (meal) {
          const quantity = meal.quantity;
          if (quantity) {
            setUserMealQuantity(quantity);
          }
        }
      }
    }
    getCartQuantity();
  }, [sessionEmail, mealDetail.id]);

  // useEffect(() => {
  //   async function mealQuantity() {
  //     if (mealDetail) {
  //       const response = await fetch("/api/cart/quantity", {
  //         method: "POST",
  //         body: JSON.stringify({ sessionEmail }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       console.log("response from meal quantity", response);
  //     }
  //   }
  //   mealQuantity();
  // }, [mealDetail,sessionEmail]);

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <MealDetail mealDetail={mealDetail} userMealQuantity={userMealQuantity} />
  );
}

// export async function getStaticPaths() {
//   const paths = foodData.map((meal) => ({ params: { slug: meal.slug } }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const mealDetail = foodData.find((food) => food.slug === params.slug);

//   return {
//     props: {
//       mealDetail,
//     },
//   };
// }

export async function getServerSideProps({ params }) {
  const mealDetail = foodData.find((food) => food.slug === params.slug);

  return {
    props: {
      mealDetail,
    },
  };
}
