import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { email, password, cart } = data;

  if (!email || !password || password.trim().length < 3) {
    res.status(422).json({ message: "Invalid values" });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    // console.log(existingUser);
    res.status(422).json({ message: "User already exist" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);
  db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
    cart: cart,
  });

  res.status(201).json({ message: "User created!" });
}

// import { connectToDatabase } from "@/db/db";
// import { hashPassword } from "@/lib/auth";

// export default async function handler(req, res) {
//   if (!req.method === "POST") {
//     return;
//   }

//   const data = req.body;
//   const { email, password, cart } = data;

//   if (password.trim().length < 3) {
//     res.status(422).json({
//       message: "Invalid password",
//     });
//   }

//   const client = await connectToDatabase();

//   const db = client.db();

//   const existingUser = await db.collection("users").findOne({ email: email });

//   if (existingUser) {
//     res.status(422).json({ message: "User already exist!" });
//     client.close();
//     return;
//   }

//   const hashedPassword = await hashPassword(password);

//   const result = await db.collection("users").insertOne({
//     email: email,
//     password: hashedPassword,
//     cart: cart,
//   });

//   res.status(200).json({ message: "Created user" });
// }
