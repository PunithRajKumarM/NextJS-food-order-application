import { connectToDatabase, getUserData } from "@/lib/db";

export default async function handler(req, res) {
  const { userItem } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (req.body === null) {
    console.log("No body");
    return;
  }

  res.status(402).json({ message: "Nothing" });
  let client = await connectToDatabase();

  const newItem = {
    id: userItem.id,
    mealName: userItem.mealName,
    src: userItem.src,
    price: userItem.price,
    description: userItem.description,
  };

  const usersCollection = client.db().collection("users");

  const existingProductIndex = await usersCollection.findOne({
    email: userItem.userEmail,
    "cart.mealName": userItem.mealName,
  });

  if (existingProductIndex !== null) {
    await usersCollection.updateOne(
      {
        email: userItem.userEmail,
        "cart.mealName": userItem.mealName,
      },
      { $inc: { "cart.$.quantity": 1 } }
    );
  } else {
    newItem.quantity = 1;
    await usersCollection.updateOne(
      { email: userItem.userEmail },
      { $push: { cart: newItem } }
    );
  }
  const { cart } = existingProductIndex;
  const findMeal = cart.find((meal) => meal.id === newItem.id);
  const { quantity } = findMeal;

  const existingProductCart = existingProductIndex.cart;
  res.status(201).json({
    message: "User updated successfully",
    newItem: existingProductCart,
    quantity: quantity,
  });

  client.close();
}
