import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notFound">
      <h2>Page not found!</h2>
      <p>
        Try using proper url or go back to <Link href="/">Home page.</Link>
      </p>
    </div>
  );
}
