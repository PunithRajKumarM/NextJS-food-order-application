import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(422)
      .json({ message: "Couldn't able to perform get method" });
  }
  const { sessionEmail, id } = req.body;
  let quantity;
  if (sessionEmail) {
    // console.log("session", sessionEmail);
  }
  const client = await connectToDatabase();
  const db = client.db();
  const collection = await db
    .collection("users")
    .findOne({ email: sessionEmail });
  if (collection) {
    const { cart } = collection;
    const findMeal = cart.find((meal) => meal.id === id);
    quantity = findMeal.quantity;
  }
  res
    .status(201)
    .json({ message: "Fetched successfully", mealQuality: quantity });
  client.close();
}
