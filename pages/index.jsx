// import React from "react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";

// export default function HomePage() {
//   const { data: session, status } = useSession();
//   const loading = status === "loading";
//   return (
//     <div className="homePage">
//       <h1>Welcome to the FoodJS</h1>

//       {session && (
//         <button>
//           <Link href="/meals">Browse Meals</Link>
//         </button>
//       )}

//       {!session && (
//         <>
//           <button>
//             <Link href="/auth">Login</Link>
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
import { useSession, signIn, signOut } from "next-auth/react";
export default function IndexPage() {
  const { data, status } = useSession();
  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    return (
      <div>
        <h1> hi {data.user.name}</h1>
        <img src={data.user.image} alt={data.user.name + " photo"} />
        <button onClick={signOut}>sign out</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn("google")}>sign in with gooogle</button>
    </div>
  );
}
