import MealsPage from "@/components/meals/meals";
import { getSession } from "next-auth/react";
import React from "react";

export default function meals() {
  return <MealsPage />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  // console.log("context req", context.req);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
