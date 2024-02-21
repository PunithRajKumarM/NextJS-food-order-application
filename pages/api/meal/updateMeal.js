import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { email, cart } = req.body;

  const client = await connectToDatabase();

  try {
    if (client) {
      const usersCollection = client.db().collection("users");

      const result = await usersCollection.updateOne(
        { email },
        {
          $set: { cart },
        }
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "User not found!!!" });
      }
      res.status(201).json({ message: "Cart updated successfully!!!" });
    } else {
      return res
        .status(404)
        .json({ message: "Unable to connect the database" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.close();
  }
}
