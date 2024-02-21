import React, { useEffect } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";

export default function HomePage() {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const { user } = data;
      const { email } = user;
      console.log(email);
      async function sendUserData() {
        if (email) {
          let res = await fetch("/api/auth/user", {
            method: "POST",
            body: JSON.stringify({ email: email, cart: [] }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            let { data } = await res.json();
            let { email, cart } = data;
            localStorage.setItem(
              "food-app-user",
              JSON.stringify({ email, cart })
            );
          }
        }
      }
      sendUserData();
    }
  }, [status, data]);

  if (status === "loading") {
    return (
      <>
        <Head>
          <title>Food Order Application</title>
        </Head>
        <div className="loading">Loading...</div>
      </>
    );
  }

  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>Food Order Application</title>
        </Head>
        <div className="homePage">
          <h1>Welcome to the FoodJS</h1>
          <button>
            <Link href="/meals">Browse Meals</Link>
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="homePage">
      <button style={{ color: "white" }} onClick={() => signIn("google")}>
        Sign in with google.
      </button>
    </div>
  );
}
