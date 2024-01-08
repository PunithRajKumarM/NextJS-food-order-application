import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  const { userItem } = req.body;

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  let client = await connectToDatabase();
  let existingProductIndex;

  if (userItem) {
    const usersCollection = client.db().collection("users");
    existingProductIndex = await usersCollection.findOne({
      email: userItem.userEmail,
      "cart.id": userItem.id,
    });

    // console.log("found existing product", existingProductIndex);
    if (existingProductIndex && existingProductIndex.cart) {
      const { cart } = existingProductIndex;
      if (cart) {
        // console.log("cart is here", cart);
        const findCartMeal = cart.find((meal) => meal.id === userItem.id);
        // console.log("found cart meal", findCartMeal);
        if (findCartMeal.quantity > 1) {
          // console.log("before updating", findCartMeal.quantity);
          await usersCollection.updateOne(
            {
              email: userItem.userEmail,
              "cart.id": userItem.id,
            },
            {
              $inc: { "cart.$.quantity": -1 },
            }
          );
          // console.log("after updating", findCartMeal.quantity);
        } else {
          await usersCollection.updateOne(
            {
              email: userItem.userEmail,
            },
            {
              $pull: {
                cart: {
                  id: userItem.id,
                },
              },
            }
          );
        }
        // console.log("updated quantity");
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
      return;
    }
  }

  const { cart } = existingProductIndex;
  const findMeal = cart.find((meal) => meal.id === userItem.id);
  const { quantity } = findMeal;
  // console.log("quantity", quantity);
  let quantityValue;
  if (quantity > 0) {
    quantityValue = quantity;
    // console.log("quantity higher", quantityValue);
  } else {
    quantityValue = 0;
    // console.log("quantity lower", quantityValue);
  }

  // console.log(quantity);
  res.status(201).json({
    message: "Meal is removed from the cart.",
    quantity: quantityValue,
  });
}
