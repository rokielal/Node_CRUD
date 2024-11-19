import { MongoClient } from "mongodb";

// Connection to the data base

const ATLAS_URI =
  "mongodb+srv://dbUser:Ivanshika@cluster0.i6hnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectionString = ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;

try {
  console.log("Connecting to MongoDB Atlas...");
  conn = await client.connect();
} catch (error) {
  console.error(error);
}

let db = conn.db("test-db");
// console.log("DB", { db });
export default db;
