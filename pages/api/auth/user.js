import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, cart } = data;

    if (!email) {
      return res.status(422).json({ message: "Invalid email" });
    }

    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(200).json({
        message: "User signed in successfully!",
        data: existingUser,
      });
      client.close();
      return;
    }
    db.collection("users").insertOne({
      email: email,
      cart: cart,
    });
    res.status(201).json({ message: "User created!", data: { email, cart } });
  }
}

// import { hashPassword } from "@/lib/auth";
// import { connectToDatabase } from "@/lib/db";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return;
//   }

//   const data = req.body;
//   const { email, password, cart } = data;

//   if (!email || !password || password.trim().length < 3) {
//     res.status(422).json({ message: "Invalid values" });
//     return;
//   }

//   const client = await connectToDatabase();
//   const db = client.db();

//   const existingUser = await db.collection("users").findOne({ email: email });

//   if (existingUser) {
//     // console.log(existingUser);
//     res.status(422).json({ message: "User already exist" });
//     client.close();
//     return;
//   }

//   const hashedPassword = await hashPassword(password);
//   db.collection("users").insertOne({
//     email: email,
//     password: hashedPassword,
//     cart: cart,
//   });

//   res.status(201).json({ message: "User created!" });
// }
