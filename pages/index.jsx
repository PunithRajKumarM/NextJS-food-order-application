import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  return (
    <div className="homePage">
      <h1>Welcome to the FoodJS</h1>

      {session && (
        <button>
          <Link href="/meals">Browse Meals</Link>
        </button>
      )}

      {!session && (
        <>
          <button>
            <Link href="/auth">Login</Link>
          </button>
        </>
      )}
    </div>
  );
}
