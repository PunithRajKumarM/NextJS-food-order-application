import React, { useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import classes from "./navbar.module.css";

export default function Navbar({ children }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {
    signOut();
  }
  return (
    <>
      <nav className={classes.navbar}>
        <h1>
          <Link href="/">FoodJS</Link>
        </h1>
        {session && (
          <>
            <Link href="/meals">Meals</Link>
            <Link href="/cart">Cart</Link>
          </>
        )}

        {session && (
          <button className={classes.navbarButton} onClick={logoutHandler}>
            Logout
          </button>
        )}
      </nav>
      {children}
    </>
  );
}
