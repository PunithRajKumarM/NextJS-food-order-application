import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = MongoClient.connect(process.env.MONGODB_URI);

  return client;
}

export async function getUserData(client) {
  const data = await client.db().collection("users");
  return data;
}
