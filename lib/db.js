import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = MongoClient.connect(
    "mongodb+srv://punithrajkumar496:punithrajkumar496@cluster0.svqeffc.mongodb.net/food-app-user?retryWrites=true&w=majority"
  );

  return client;
}

export async function getUserData(client) {
  const data = await client.db().collection("users");
  return data;
}
