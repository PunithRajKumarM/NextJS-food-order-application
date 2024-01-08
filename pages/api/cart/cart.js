import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(422)
      .json({ message: "Couldn't able to perform get method" });
  }
  const { sessionEmail } = req.body;
  console.log("session", sessionEmail);
  const client = await connectToDatabase();
  const db = client.db();
  const collection = await db
    .collection("users")
    .findOne({ email: sessionEmail });

  res
    .status(201)
    .json({ message: "Fetched successfully", userData: collection });
  client.close();
}
